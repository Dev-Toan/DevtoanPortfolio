import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";

import { Services, TechStack, ContactCTA, WorkExperience } from "@/components/home";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <>
      <Column maxWidth="m" gap="xl" horizontal="center" style={{ position: "relative" }}>
        <div className="aurora-glow-1" />
        <div className="aurora-glow-2" />
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={home.path}
          title={home.title}
          description={home.description}
          image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        {home.featured.display && (
          <RevealFx
            fillWidth
            horizontal="center"


          >
            <Badge
              className="shimmer-badge"
              background="brand-alpha-weak"
              paddingX="12"
              paddingY="4"
              onBackground="neutral-strong"
              textVariant="label-default-s"
              arrow={false}
              href={home.featured.href}
            >
              <Row paddingY="2">{home.featured.title}</Row>
            </Badge>
          </RevealFx>
        )}
        <Row
          fillWidth
          gap="m"
          vertical="center"
          s={{ direction: "column", horizontal: "center" }}
          paddingX="0"
        >
          {about.avatar.display && (
            <RevealFx translateY="4" horizontal="center" style={{ marginLeft: "-10px" }}>
              <div className="rgb-border-wrapper">
                <Avatar
                  src={person.avatar}
                  size={20}
                />
              </div>
            </RevealFx>
          )}
          <Column
            flex={1}
            gap="m"
            horizontal="start"
            s={{ horizontal: "center", style: { textAlign: "center" } }}
          >
            <RevealFx translateY="4" fillWidth paddingBottom="8">
              <Heading wrap="nowrap" variant="display-strong-l" className="rgb-text">
                {home.headline}
              </Heading>
            </RevealFx>
            <RevealFx translateY="8" delay={0.2} fillWidth paddingBottom="32">
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                {home.subline}
              </Text>
            </RevealFx>
          </Column>
        </Row>
        <RevealFx fillWidth horizontal="center" paddingTop="12" delay={0.4}>
          <Button
            id="about"
            data-border="rounded"
            href={about.path}
            variant="secondary"
            size="l"
            weight="default"
            arrowIcon
          >
            <Row gap="8" vertical="center" paddingRight="4">
              {about.avatar.display && (
                <Avatar
                  marginRight="8"
                  style={{ marginLeft: "-0.85rem" }}
                  src={person.avatar}
                  size="l"
                />
              )}
              {about.title}
            </Row>
          </Button>
        </RevealFx>

        <TechStack />

        <WorkExperience />

        <Services />

        <ContactCTA />
      </Column>
    </>
  );
}