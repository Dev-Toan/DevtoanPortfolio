"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  List,
  ListItem,
  Media,
  Scroller,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { TechTag } from "@/components/TechTag";

interface ProjectCardProps {
  github?: string;
  demo?: string;
  priority?: boolean;
  images: string[];
  title: string;
  description: string;
  avatars: { src: string }[];
  memberCount?: number;
  technologies?: { name: string; icon?: string }[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  github,
  demo,
  priority,
  images = [],
  title,
  description,
  avatars,
  memberCount = 0,
  technologies = [],
}) => {
  const summaryPoints = description
    ?.split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const hasDetails =
    avatars?.length > 0 ||
    technologies?.length > 0 ||
    summaryPoints?.length > 0 ||
    github ||
    demo;

  return (
    <Column fillWidth gap="m">
      <Carousel
        aspectRatio="16 / 9"
        priority={priority}
        sizes="(max-width: 960px) 100vw, 960px"
        items={images.map((image, index) => ({
          slide: (
            <Media
              src={image}
              alt={title}
              fill
              objectFit="contain"
              background="neutral-alpha-weak"
              sizes="(max-width: 960px) 100vw, 960px"
              priority={priority && index === 0}
            />
          ),
          alt: title,
        }))}
      />
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Column flex={5} gap="8">
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
            {memberCount > 0 && (
              <Text variant="body-default-s" onBackground="neutral-weak">
                {memberCount} thành viên
              </Text>
            )}
          </Column>
        )}
        {hasDetails && (
          <Column flex={7} gap="16">
            {(avatars?.length > 0 || technologies?.length > 0) && (
              <Flex gap="12" vertical="center" fillWidth style={{ minWidth: 0 }}>
                {avatars?.length > 0 && (
                  <AvatarGroup avatars={avatars} size="m" reverse />
                )}
                {technologies?.length > 0 && (
                  <Scroller direction="row" gap="8" flex={1} style={{ minWidth: 0 }}>
                    {technologies.map((tech) => (
                      <TechTag
                        key={tech.name}
                        name={tech.name}
                        icon={tech.icon}
                        size="m"
                      />
                    ))}
                  </Scroller>
                )}
              </Flex>
            )}
            {summaryPoints?.length > 0 && (
              <List as="ul">
                {summaryPoints.map((point) => (
                  <ListItem key={point}>
                    <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                      {point}
                    </Text>
                  </ListItem>
                ))}
              </List>
            )}
            <Flex gap="24" wrap>
              {github && (
                <SmartLink
                  suffixIcon="github"
                  style={{ margin: "0", width: "fit-content" }}
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text variant="body-default-s">Chi tiết github</Text>
                </SmartLink>
              )}
              {demo && (
                <SmartLink
                  suffixIcon="youtube"
                  style={{ margin: "0", width: "fit-content" }}
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text variant="body-default-s">Xem demo dự án</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
}
