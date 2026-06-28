import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";
import { contact } from "@/resources";

export function ContactCTA() {
  if (!contact.display) {
    return null;
  }

  return (
    <Column
      fillWidth
      gap="24"
      padding="32"
      radius="l"
      border="neutral-alpha-weak"
      background="neutral-alpha-weak"
      horizontal="center"
      align="center"
    >
      <Column gap="8" horizontal="center" align="center">
        <Heading as="h2" variant="heading-strong-xl" wrap="balance">
          {contact.title}
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" wrap="balance">
          {contact.description}
        </Text>
      </Column>
      <Row gap="12" wrap horizontal="center">
        <Button
          href={contact.primaryButton.href}
          variant="primary"
          size="m"
          prefixIcon={contact.primaryButton.icon}
          arrowIcon
        >
          {contact.primaryButton.label}
        </Button>
        {contact.secondaryButton && (
          <Button
            href={contact.secondaryButton.href}
            variant="secondary"
            size="m"
            prefixIcon={contact.secondaryButton.icon}
          >
            {contact.secondaryButton.label}
          </Button>
        )}
      </Row>
    </Column>
  );
}
