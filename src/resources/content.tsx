import { About, Home, Person, Social, Work } from "@/types";
import { IconName } from "@/resources/icons";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Đức Toàn",
  lastName: "Nguyễn",
  name: `Nguyễn Đức Toàn`,
  role: "FullStack Developer",
  avatar: "/images/a1.jpg",
  email: "toanit5.haui@gmail.com",
  location: "Asia/Ho_Chi_Minh",
  languages: ["Tiếng Anh", "Tiếng Việt"],
  locale: "vi",
};



const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Dev-Toan",
    essential: true,
  },
    {
    name: "Facebook",
    icon: "facebook",
    link: "https://www.facebook.com/DevToan2k4/",
    essential: true,
  },
  // {
  //   name: "LinkedIn",
  //   icon: "linkedin",
  //   link: "https://www.linkedin.com/company/once-ui/",
  //   essential: true,
  // },
  // {
  //   name: "Instagram",
  //   icon: "instagram",
  //   link: "https://www.instagram.com/once_ui/",
  //   essential: false,
  // },
  // {
  //   name: "Threads",
  //   icon: "threads",
  //   link: "https://www.threads.com/@once_ui",
  //   essential: true,
  // },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Trang chủ",
  title: `Portfolio của ${person.name}`,
  description: `Portfolio giới thiệu công việc của tôi với vai trò là một ${person.role}`,
  headline: <>FullStack Developer</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Nguyễn Đức Toàn</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Github profile
        </Text>
      </Row>
    ),
    href: "https://github.com/Dev-Toan",
  },
  subline: (
    // <>
    //   Tôi là {person.firstName}, một {person.role.toLowerCase()} tại{" "}
    //   <Text as="span" size="xl" weight="strong">ONCE UI</Text>, nơi tôi tạo ra những trải nghiệm người dùng <br /> trực quan. Sau giờ làm, tôi xây dựng các dự án của riêng mình.
    // </>

      <>
        Tôi là Nguyễn Đức Toàn. Không chỉ viết code, tôi còn mang đến các các giải pháp thiết kế và phát triển hệ thống toàn diện từ website đến mobile. 
      </>
  ),
};

const about: About = {
  path: "/about",
  label: "Giới thiệu",
  title: `Giới thiệu – ${person.name}`,
  description: `Gặp gỡ ${person.name}, ${person.role} từ ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Giới thiệu",
    description: (
      <>
        {person.firstName} là một {person.role.toLowerCase()} tại {person.location.split("/")[1]?.replace("_", " ")} với niềm đam mê biến những thách thức phức tạp
        thành các giải pháp thiết kế đơn giản và thanh lịch. Công việc của họ bao gồm các giao diện kỹ thuật số, trải nghiệm tương tác và sự hội tụ của thiết kế và công nghệ.
      </>
    ),
  },
  work: {
    display: true,
    title: "Kinh nghiệm làm việc",
    experiences: [
      {
        company: "VNPT-Media",
        timeframe: "5/2026 - Hiện tại",
        role: "Thực tập sinh Mobile",
        achievements: [
          <>
            Trực tiếp tham gia phát triển phần mềm cho các dự án và dịch vụ của VNPT, tập trung nghiên
            cứu chuyên sâu và ứng dụng ngôn ngữ Kotlin để xây dựng các ứng dụng Android hiệu năng cao.
          </>,
          <>
            Xây dựng giao diện người dùng theo kiến trúc Declarative UI bằng thư viện Jetpack Compose.
            Áp dụng các design pattern (MVVM) để tách biệt logic và giao diện, tối ưu hóa việc quản lý state
            và giảm thiểu re-composition không cần thiết.
          </>,
          <>
            Thiết kế giao diện màn hình và tích hợp Google Cloud Firestore cho tính năng Chat Realtime trên
            hệ thống quản lý tòa nhà VNPT BMSI, giải quyết triệt để bài toán đồng bộ tin nhắn tức thời và tối
            ưu hóa chi phí đọc/ghi dữ liệu.
          </>,
          <>
            Tham gia phát triển và hoàn thiện module phân loại phim theo nội dung và độ tuổi
            cho nền tảng giải trí web mobiletv và hệ thống quản trị nội dung VNPT CMS.
          </>,
          <>
            Phối hợp cùng đội ngũ kỹ thuật rà soát lỗi, tối ưu hóa bộ nhớ và tham gia hỗ trợ vận
            hành, tự động hóa quy trình deploy dự án mobileTV lên môi trường Production.
          </>,
          <>
            Xây dựng trang Portal bằng Next.js cho dự án PassV - dự án bán SIM/eSIM Data quốc tế qua
            cổng PassV. Áp dụng SSR/ISR trong Next.js giúp giảm thời gian tải trang đầu tiên dưới 1.5 giây.
          </>,
          <>
            Thiết kế và phát triển RESTful API (quản lý banner, quản lý người dùng) cho dự án PassV sử
            dụng Java Spring Boot.
          </>,
          <>
            Thiết kế và triển khai public API lấy danh sách Banner công khai, tối ưu cấu trúc JSON để giảm
            độ trễ truyền tải đảm bảo hệ thống phản hồi nhanh khi xử lý lượng lớn yêu cầu từ phía Client.
          </>,
        ],
        images: [
          // {
          //   src: "/images/projects/project-01/cover-01.jpg",
          //   alt: "Dự án Once UI",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        company: "Trung tâm công nghệ thông tin Mobifone",
        timeframe: "12/2025 - 2/2026",
        role: "Thực tập sinh dev",
        achievements: [
          <>
            Nghiên cứu và ứng dụng các công nghệ mới vào giải quyết đồ án tốt nghiệp.
          </>,
          <>
            Xây dựng Database tối ưu cho các luồng nghiệp vụ bằng PostgreSQL.
          </>,
          <>
            Xây dựng hệ thống RESTful API tuân thủ các tiêu chuẩn bảo mật và truy xuất dữ liệu tốc độ cao.
          </>,
          <>
            Phát triển giao diện Web Dashboard quản trị hiện đại, responsive bằng Next.js và ứng dụng di
            động đa nền tảng bằng React Native.
          </>,
          <>
            Viết các cấu hình Docker (Docker file) để đóng gói toàn bộ Backend, loại bỏ các lỗi
            xung đột môi trường và deploy thành công lên nền tảng đám mây Render.
          </>,
          <>
            Thiết lập luồng triển khai tự động, đưa hệ thống Web quản lý lên Vercel.
          </>,
          <>
            Khởi tạo, cấu hình và quản trị cơ sở dữ liệu trên nền tảng Cloud Serverless Postgres Neon, đảm
            bảo hệ thống vận hành 24/7 và an toàn dữ liệu.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Học vấn",
    institutions: [
      {
        name: "Đại học Công nghiệp Hà Nội",
        description: <>Chuyên ngành Công nghệ thông tin</>,
      },
      {
        name: "Tham gia nghiên cứu khoa học cấp trường",
        description: <> Đề tài: "Nghiên cứu các thuật toán tối ưu hóa cho bài toán khuyến nghị học tập và dự đoán GPA của sinh viên ngành CNTT HaUI" <br />
        Phụ trách xây dựng ứng dụng mobile bằng ngôn ngữ java trên nền tảng android để thu thập dữ liệu và hiển thị kết quả khuyến nghị cho sinh viên.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Kỹ năng kỹ thuật",
    skills: [
      {
        title: "Ngôn ngữ lập trình",
        description: (
          <></>
        ),
        tags: [
          {
            name: "Java",
            icon: "java",
          },
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "C++",
            icon: "cpp",
          },
          {
            name: "C#",
            icon: "csharp",
          },
          {
            name: "python",
            icon: "python",
          },
          {
            name: "TypeScript",
            icon: "typescript",
          },
          {
            name: "Kotlin",
            icon: "kotlin",
          },
          {
            name: "HTML",
            icon: "HTML",
          },
          {
            name: "CSS",
            icon: "css",
          },
        ],
        images: [
          // {
          //   src: "/images/projects/project-01/cover-02.jpg",
          //   alt: "Hình ảnh dự án",
          //   width: 16,
          //   height: 9,
          // },
          // {
          //   src: "/images/projects/project-01/cover-03.jpg",
          //   alt: "Hình ảnh dự án",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        title: "FrameWork",
        description: (
          <></>
        ),
        tags: [
          {
            name: "React Native",
            icon: "react",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "Spring Boot",
            icon: "spring",
          },
          {
            name: "Jetpack Compose",
            icon: "jetpack",
          },
          {
            name: "Spring Security",
            icon: "springsecurity",
          },
          {
            name: "Spring JPA",
            icon: "springjpa",
          },
          {
            name: "ASP.NET",
            icon: "APS",
          },
        ],
        images: [
          // {
          //   src: "/images/projects/project-01/cover-04.jpg",
          //   alt: "Hình ảnh dự án",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },

      {
        title: "Cơ sở dữ liệu",
        description: (
          <></>
        ),
        tags: [
          {
            name: "PostgreSQL",
            icon: "postgresql",
          },
          {
            name: "MySQL",
            icon: "mysql",
          },

        ],
        images: [
          // {
          //   src: "/images/projects/project-01/cover-04.jpg",
          //   alt: "Hình ảnh dự án",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },


      {
        title: "API",
        description: (
          <></>
        ),
        tags: [
          {
            name: "RESTful API",
            icon: "restapi",
          },
          {
            name: "PayOS API",
            icon: "payos",
          },
          {
            name: " Google Cloud Firestore",
            icon: "firestore",
          },
          {
            name: "Google Gemini",
            icon: "gemini",
          },
        ],
        images: [
          // {
          //   src: "/images/projects/project-01/cover-04.jpg",
          //   alt: "Hình ảnh dự án",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },


            {
        title: "DevOps cơ bản",
        description: (
          <></>
        ),
        tags: [
          {
            name: "Docker",
            icon: "docker",
          },

        ],
        images: [
          // {
          //   src: "/images/projects/project-01/cover-04.jpg",
          //   alt: "Hình ảnh dự án",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },

                  {
        title: "AUTHENTICATION",
        description: (
          <></>
        ),
        tags: [
          {
            name: "JWT",
            icon: "jwt",
          },
          {
            name: "CORS",
            icon: "cors",
          },
        ],
        images: [
          // {
          //   src: "/images/projects/project-01/cover-04.jpg",
          //   alt: "Hình ảnh dự án",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },


      {
        title: "TESTING",
        description: (
          <></>
        ),
        tags: [
          {
            name: "POSTMAN",
            icon: "postman",
          },
        ],
        images: [
          // {
          //   src: "/images/projects/project-01/cover-04.jpg",
          //   alt: "Hình ảnh dự án",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },


      
      {
        title: "VERSION CONTROL",
        description: (
          <></>
        ),
        tags: [
          {
            name: "Git",
            icon: "git",
          },
          {
            name: "GitHub",
            icon: "github",
          },
        ],
        images: [
          // {
          //   src: "/images/projects/project-01/cover-04.jpg",
          //   alt: "Hình ảnh dự án",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },

    ],
  },
};

const services: {
  display: boolean;
  subtitle: string;
  title: string;
  items: Array<{
    icon: IconName;
    title: string;
    description: string;
  }>;
} = {
  display: true,
  subtitle: "Dịch vụ",
  title: "Tôi Có Thể Giúp Gì Cho Bạn?",
  items: [
    {
      icon: "devices",
      title: "Phát triển Web & Mobile App",
      description:
        "Thiết kế và lập trình ứng dụng di động, website chuyên nghiệp. Tối ưu trải nghiệm người dùng (UX) và hiệu năng (Performance) đạt chuẩn cao nhất.",
    },
    {
      icon: "lightbulb",
      title: "Tư vấn Giải pháp Công nghệ",
      description:
        "Lựa chọn Tech-stack phù hợp, tái cấu trúc hệ thống cũ hoặc thiết kế kiến trúc phần mềm tối ưu chi phí cho Startup và Doanh nghiệp.",
    },
    {
      icon: "microchip", 
      title: "Phát triển các dự án IOT cơ bản",
      description: "Thiết kế và lập trình vi điều khiển Arduino, tích hợp cảm biến để xây dựng các thiết bị thông minh.",
    },
  ],
};

const techStack: {
  display: boolean;
  subtitle: string;
  items: Array<{
    name: string;
    icon?: IconName;
  }>;
} = {
  display: true,
  subtitle: "Công nghệ",
  items: [
    { name: "Next.js", icon: "nextjs" },
    { name: "React Native", icon: "react" },
    { name: "Jetpack Compose", icon: "jetpack" },
    { name: "TypeScript", icon: "typescript" },
    { name: "JavaScript", icon: "javascript" },
    { name: "Spring Boot", icon: "spring" },
    { name: "Spring Security", icon: "spring" },
  
  ],
};

const contact: {
  display: boolean;
  title: string;
  description: string;
  primaryButton: {
    label: string;
    href: string;
    icon?: IconName;
  };
  secondaryButton?: {
    label: string;
    href: string;
    icon?: IconName;
  };
} = {
  display: true,
  title: "Có dự án cần triển khai?",
  description:
    "Hãy liên hệ để trao đổi về ý tưởng, báo giá hoặc hợp tác phát triển web & mobile app.",
  primaryButton: {
    label: "Gửi email",
    href: `mailto:${person.email}`,
    icon: "email",
  },
  secondaryButton: {
    label: "Facebook",
    href: "https://www.facebook.com/DevToan2k4/",
    icon: "facebook",
  },
};

const work: Work = {
  path: "/work",
  label: "Dự án",
  title: `Dự án nổi bật`,
  description: `Các dự án thiết kế và phát triển của ${person.name}`,
};

export { person, social, home, about, services, techStack, contact, work };
