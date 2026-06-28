import { Row, Text } from "@once-ui-system/core";
import { getIconColor } from "@/resources/iconColors";
import { iconLibrary, type IconName } from "@/resources/icons";

interface TechTagProps {
  name: string;
  icon?: string;
  size?: "s" | "m" | "l";
  style?: React.CSSProperties;
}

export function TechTag({ name, icon, size = "l", style }: TechTagProps) {
  const paddingX = size === "s" ? "8" : size === "m" ? "8" : "12";
  const paddingY = size === "s" ? "1" : size === "m" ? "2" : "4";
  const color = getIconColor(icon);
  const IconComponent = icon ? iconLibrary[icon as IconName] : null;
  const iconSize = size === "s" ? 14 : size === "m" ? 16 : 16;

  return (
    <Row
      fitWidth
      background="neutral-weak"
      border="neutral-alpha-medium"
      onBackground="neutral-medium"
      paddingX={paddingX}
      paddingY={paddingY}
      vertical="center"
      radius="s"
      gap="4"
      style={{ flexShrink: 0, ...style }}
    >
      {IconComponent && (
        <IconComponent
          aria-hidden
          style={{ color, width: iconSize, height: iconSize, flexShrink: 0 }}
        />
      )}
      <Text variant="label-default-s">{name}</Text>
    </Row>
  );
}
