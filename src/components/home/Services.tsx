import { Column, Grid, Heading, Icon, Row, Text } from "@once-ui-system/core";
import { services } from "@/resources";

export function Services() {
  if (!services.display) {
    return null;
  }

  return (
    <Column fillWidth gap="40" paddingY="32" horizontal="center">
      <Column gap="8" horizontal="center" align="center">
        <Text
          variant="label-default-s"
          onBackground="neutral-weak"
          style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          {services.subtitle}
        </Text>
        <Heading as="h2" variant="display-strong-s" wrap="balance">
          {services.title}
        </Heading>
      </Column>

      <Grid columns="3" m={{ columns: 2 }} s={{ columns: 1 }} gap="24" fillWidth>
        {services.items.map((item) => (
          <Column
            key={item.title}
            fillWidth
            gap="16"
            padding="24"
            radius="l"
            className="rgb-card"
          >
            <Row
              background="neutral-alpha-medium"
              padding="12"
              radius="m"
              width="48"
              height="48"
              horizontal="center"
              vertical="center"
            >
              <Icon name={item.icon} size="m" />
            </Row>
            <Heading as="h3" variant="heading-strong-m">
              {item.title}
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {item.description}
            </Text>
          </Column>
        ))}
      </Grid>
    </Column>
  );
}
