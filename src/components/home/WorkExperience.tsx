import { Column, Heading, Row, Text, Badge, Line } from "@once-ui-system/core";
import { about } from "@/resources";

export function WorkExperience() {
  if (!about.work.display || !about.work.experiences.length) {
    return null;
  }

  return (
    <Column fillWidth gap="40" paddingY="32" horizontal="center">
      {/* Title section */}
      <Column gap="8" horizontal="center" align="center">
        <Text
          variant="label-default-s"
          onBackground="neutral-weak"
          style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          {about.work.title}
        </Text>
        <Heading as="h2" variant="display-strong-s" wrap="balance">
          Hành trình nghề nghiệp
        </Heading>
      </Column>

      {/* Timeline entries */}
      <Column fillWidth maxWidth="s" gap="32" paddingX="l">
        {about.work.experiences.map((experience, index) => (
          <Row key={`${experience.company}-${index}`} gap="24" fillWidth>
            {/* Left timeline line with node indicator */}
            <Column horizontal="center" fitWidth>
              <Row
                background="brand-medium"
                radius="full"
                width="12"
                height="12"
                style={{ marginTop: "6px" }}
              />
              {index < about.work.experiences.length - 1 && (
                <Line
                  background="neutral-alpha-weak"
                  vert
                  style={{ flexGrow: 1, minHeight: "80px", marginTop: "8px" }}
                />
              )}
            </Column>
            {/* Right content */}
            <Column flex={1} gap="8">
              <Row fillWidth horizontal="between" vertical="center" gap="12" wrap>
                <Heading variant="heading-strong-l">
                  {experience.company}
                </Heading>
                <Badge size="s" variant="brand-alpha-weak">
                  {experience.timeframe}
                </Badge>
              </Row>
              <Text variant="body-default-s" onBackground="brand-weak" style={{ fontWeight: 600 }}>
                {experience.role}
              </Text>
              <Column as="ul" gap="8" style={{ paddingLeft: "16px", margin: 0 }}>
                {experience.achievements.map((achievement, actIndex) => (
                  <Text
                    as="li"
                    variant="body-default-m"
                    onBackground="neutral-weak"
                    key={`${experience.company}-${actIndex}`}
                  >
                    {achievement}
                  </Text>
                ))}
              </Column>
            </Column>
          </Row>
        ))}
      </Column>
    </Column>
  );
}
