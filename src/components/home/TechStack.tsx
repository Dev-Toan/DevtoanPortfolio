import { Column, Row, Text } from "@once-ui-system/core";
import { TechTag } from "@/components/TechTag";
import { techStack } from "@/resources";

export function TechStack() {
  if (!techStack.display) {
    return null;
  }

  return (
    <Column fillWidth gap="16" horizontal="center" align="center">
      <Text
        variant="label-default-s"
        onBackground="neutral-weak"
        style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
      >
        {techStack.subtitle}
      </Text>
      <Row wrap gap="8" horizontal="center">
        {techStack.items.map((item) => (
          <TechTag key={item.name} name={item.name} icon={item.icon} size="l" />
        ))}
      </Row>
    </Column>
  );
}
