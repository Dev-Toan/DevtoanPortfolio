"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Column,
  Row,
  Grid,
  Heading,
  Text,
  Spinner,
  PasswordInput,
  Card,
  Line,
  Tag,
  Icon,
  Table,
} from "@once-ui-system/core";
import { LineChart } from "@once-ui-system/core";
import type { StatsResult } from "@/lib/analytics";

// ---- Login gate --------------------------------------------------------------

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);
    setError(undefined);
    try {
      const res = await fetch("/api/admin/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        setError("Sai mật khẩu admin");
      }
    } catch {
      setError("Không kết nối được máy chủ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Column paddingY="128" maxWidth={24} gap="24" center fillWidth>
      <Heading align="center" wrap="balance">
        Admin — Thống kê truy cập
      </Heading>
      <Column fillWidth gap="8" horizontal="center">
        <PasswordInput
          id="admin-password"
          label="Mật khẩu admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          errorMessage={error}
        />
        <Button onClick={submit} loading={submitting} disabled={submitting} fillWidth>
          Đăng nhập
        </Button>
      </Column>
    </Column>
  );
}

// ---- Small presentational helpers -------------------------------------------

const numberFmt = new Intl.NumberFormat("vi-VN");

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <Card fillWidth padding="20" radius="l" direction="column" gap="8" border="neutral-alpha-weak">
      <Row gap="8" vertical="center">
        <Icon name={icon} onBackground="brand-medium" size="s" />
        <Text variant="label-default-s" onBackground="neutral-weak">
          {label}
        </Text>
      </Row>
      <Heading variant="display-strong-xs">{value}</Heading>
    </Card>
  );
}

/** Horizontal-bar breakdown list (top pages, countries, browsers, …). */
function Breakdown({
  title,
  icon,
  items,
  max = 8,
}: {
  title: string;
  icon: string;
  items: { label: string; count: number }[];
  max?: number;
}) {
  const top = items.slice(0, max);
  const peak = top.reduce((m, i) => Math.max(m, i.count), 0) || 1;

  return (
    <Card
      fillWidth
      padding="20"
      radius="l"
      direction="column"
      gap="16"
      border="neutral-alpha-weak"
    >
      <Row gap="8" vertical="center">
        <Icon name={icon} onBackground="brand-medium" size="s" />
        <Heading variant="heading-strong-s">{title}</Heading>
      </Row>
      {top.length === 0 ? (
        <Text onBackground="neutral-weak" variant="body-default-s">
          Chưa có dữ liệu
        </Text>
      ) : (
        <Column fillWidth gap="12">
          {top.map((it) => (
            <Column key={it.label} fillWidth gap="4">
              <Row fillWidth horizontal="between" gap="8">
                <Text variant="body-default-s" style={{ wordBreak: "break-all" }}>
                  {it.label || "-"}
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {numberFmt.format(it.count)}
                </Text>
              </Row>
              <div
                style={{
                  height: 6,
                  width: "100%",
                  borderRadius: 999,
                  background: "var(--neutral-alpha-weak)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.max(4, (it.count / peak) * 100)}%`,
                    borderRadius: 999,
                    background: "var(--brand-solid-strong)",
                  }}
                />
              </div>
            </Column>
          ))}
        </Column>
      )}
    </Card>
  );
}

function fmtTime(ms: number): string {
  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(ms));
}

const deviceIcon: Record<string, string> = {
  mobile: "mobile",
  tablet: "tablet",
  desktop: "computer",
};

// ---- Dashboard ---------------------------------------------------------------

function Dashboard() {
  const [stats, setStats] = useState<StatsResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const load = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await fetch("/api/admin/stats", { cache: "no-store" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message || `Lỗi ${res.status}`);
        return;
      }
      setStats(await res.json());
    } catch {
      setError("Không tải được số liệu");
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(async () => {
    if (
      !window.confirm(
        "Xóa toàn bộ số liệu truy cập (tổng lượt + lịch sử sự kiện)? Hành động này không thể hoàn tác.",
      )
    ) {
      return;
    }
    setResetting(true);
    setError(undefined);
    try {
      const res = await fetch("/api/admin/reset", { method: "POST", cache: "no-store" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message || `Lỗi ${res.status}`);
        return;
      }
      await load();
    } catch {
      setError("Không xóa được số liệu");
    } finally {
      setResetting(false);
    }
  }, [load]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading && !stats) {
    return (
      <Row fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Row>
    );
  }

  if (error && !stats) {
    return (
      <Column fillWidth paddingY="64" gap="16" horizontal="center">
        <Text onBackground="danger-weak">{error}</Text>
        <Button onClick={load} variant="secondary">
          Thử lại
        </Button>
      </Column>
    );
  }

  if (!stats) return null;

  const chartData = stats.timeSeries.map((p) => ({ label: p.date, visits: p.count }));

  return (
    <Column fillWidth gap="24" maxWidth="l">
      <Row fillWidth horizontal="between" vertical="center" gap="16" wrap>
        <Column gap="4">
          <Heading variant="display-strong-s">Thống kê truy cập</Heading>
          <Text onBackground="neutral-weak" variant="body-default-s">
            Cửa sổ gần nhất: {numberFmt.format(stats.sampleSize)} lượt · giờ Việt Nam (UTC+7)
          </Text>
        </Column>
        <Row gap="8" vertical="center">
          <Button
            onClick={load}
            variant="secondary"
            size="s"
            prefixIcon="refresh"
            loading={loading}
          >
            Làm mới
          </Button>
          <Button
            onClick={reset}
            variant="danger"
            size="s"
            prefixIcon="trash"
            loading={resetting}
            disabled={resetting}
          >
            Xóa số liệu
          </Button>
        </Row>
      </Row>

      {/* KPI cards */}
      <Grid columns="4" m={{ columns: 2 }} s={{ columns: 2 }} gap="16" fillWidth>
        <StatCard label="Tổng lượt truy cập" value={numberFmt.format(stats.totalVisits)} icon="eye" />
        <StatCard
          label="Khách duy nhất (IP)"
          value={numberFmt.format(stats.uniqueVisitors)}
          icon="person"
        />
        <StatCard
          label="Lượt trong cửa sổ"
          value={numberFmt.format(stats.sampleSize)}
          icon="calendar"
        />
        <StatCard
          label="Số trang được xem"
          value={numberFmt.format(stats.topPages.length)}
          icon="grid"
        />
      </Grid>

      {/* Time series */}
      <Card fillWidth padding="20" radius="l" border="neutral-alpha-weak" direction="column" gap="16">
        <Row gap="8" vertical="center">
          <Icon name="calendar" onBackground="brand-medium" size="s" />
          <Heading variant="heading-strong-s">Lượt truy cập theo ngày</Heading>
        </Row>
        {chartData.length === 0 ? (
          <Text onBackground="neutral-weak" variant="body-default-s">
            Chưa có dữ liệu
          </Text>
        ) : (
          <LineChart
            minHeight={16}
            data={chartData}
            series={{ key: "visits" }}
            axis="both"
            grid="y"
            tooltip
            legend={{ display: false }}
          />
        )}
      </Card>

      {/* Breakdowns */}
      <Grid columns="2" m={{ columns: 1 }} s={{ columns: 1 }} gap="16" fillWidth>
        <Breakdown title="Top trang" icon="grid" items={stats.topPages} />
        <Breakdown title="Quốc gia" icon="globe" items={stats.countries} />
        <Breakdown title="Trình duyệt" icon="window" items={stats.browsers} />
        <Breakdown title="Hệ điều hành" icon="computer" items={stats.os} />
        <Breakdown title="Thiết bị" icon="mobile" items={stats.devices} />
        <Breakdown title="Nguồn truy cập" icon="link" items={stats.referrers} />
      </Grid>

      {/* Visitor table */}
      <Card fillWidth padding="20" radius="l" border="neutral-alpha-weak" direction="column" gap="16">
        <Row gap="8" vertical="center">
          <Icon name="person" onBackground="brand-medium" size="s" />
          <Heading variant="heading-strong-s">
            Khách truy cập ({numberFmt.format(stats.visitors.length)})
          </Heading>
        </Row>
        <Table
          data={{
            headers: [
              { content: "IP", key: "ip" },
              { content: "Quốc gia", key: "country" },
              { content: "Thành phố", key: "city" },
              { content: "Lượt", key: "count" },
              { content: "Gần nhất", key: "last" },
            ],
            rows: stats.visitors.slice(0, 100).map((v) => [
              v.ip,
              v.country || "-",
              v.city || "-",
              numberFmt.format(v.count),
              fmtTime(v.last),
            ]),
          }}
        />
      </Card>

      {/* Recent live feed */}
      <Card fillWidth padding="20" radius="l" border="neutral-alpha-weak" direction="column" gap="16">
        <Row gap="8" vertical="center">
          <Icon name="clock" onBackground="brand-medium" size="s" />
          <Heading variant="heading-strong-s">Hoạt động gần đây</Heading>
        </Row>
        <Column fillWidth gap="4">
          {stats.recentEvents.map((e, i) => (
            <div key={`${e.t}-${i}`}>
              <Row
                fillWidth
                horizontal="between"
                vertical="center"
                gap="12"
                paddingY="8"
                wrap
              >
                <Row gap="8" vertical="center" wrap>
                  <Tag size="s" prefixIcon={deviceIcon[e.device] ?? "computer"}>
                    {e.device}
                  </Tag>
                  <Text variant="body-default-s" style={{ wordBreak: "break-all" }}>
                    {e.path}
                  </Text>
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    {e.browser} · {e.os}
                  </Text>
                </Row>
                <Row gap="8" vertical="center">
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    {[e.city, e.country].filter((x) => x && x !== "-").join(", ") || "—"}
                  </Text>
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    {fmtTime(e.t)}
                  </Text>
                </Row>
              </Row>
              {i < stats.recentEvents.length - 1 && (
                <Line background="neutral-alpha-weak" />
              )}
            </div>
          ))}
        </Column>
      </Card>
    </Column>
  );
}

// ---- Page --------------------------------------------------------------------

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/admin/check-auth")
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) {
    return (
      <Row fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Row>
    );
  }

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return <Dashboard />;
}
