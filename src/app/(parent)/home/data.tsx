export const data = [
  {
    "class": "Lớp 1",
    "course": [
      {
        "id": "1",
        "image":
          "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/07/anh-bia-dep-1.jpg.webp",
        "title": "Khóa học X cho lớp nghỉ hè",
        "name": "Khóa học cơ bản",
      },
      {
        "id": "2",
        "image":
          "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/07/anh-bia-dep-1.jpg.webp",
        "title": "Khóa học X cho lớp nghỉ tết",
        "name": "Khóa học cơ bản",
      },
      {
        "id": "3",
        "image":
          "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/07/anh-bia-dep-1.jpg.webp",
        "title": "Khóa học X cho lớp nghỉ hè",
        "name": "Khóa học nâng cao",
      },
    ],
  },
  {
    "class": "Lớp 2",
    "course": [
      {
        "id": "4",
        "image":
          "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/07/anh-bia-dep-1.jpg.webp",
        "title": "Khóa học X cho lớp nghỉ xuân",
        "name": "Khóa học cơ bản",
      },
      {
        "id": "5",
        "image":
          "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/07/anh-bia-dep-1.jpg.webp",
        "title": "Khóa học X cho lớp nghỉ xuân",
        "name": "Khóa học nâng cao",
      },
    ],
  },
  {
    "class": "Lớp 3",
    "course": [
      {
        "id": "6",
        "image":
          "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/07/anh-bia-dep-1.jpg.webp",
        "title": "Khóa học X cho lớp nghỉ tết",
        "name": "Khóa học nâng cao",
      },
      {
        "id": "7 ",
        "image":
          "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/07/anh-bia-dep-1.jpg.webp",
        "title": "Khóa học X cho lớp nghỉ hè",
        "name": "Khóa học nâng 1",
      },
    ],
  },
];
interface Teacher  {
  id: string;
  name: string;
  description: string;
  avatar: string;
  experience: string;
};

// Sample teacher data
export const teachers: Teacher[] = [
  {
    id: "1",
    name: "Mr. Smith",
    description: "Chuyên dạy toán tiểu học",
    avatar: "https://studiochupanhdep.com/Upload/Images/anh-chan-dung-nam.jpeg",
    experience: "4 năm",
  },
  {
    id: "2",
    name: "Ms. Johnson",
    description: "Chuyên dạy toán tư duy",
    avatar: "https://studiochupanhdep.com/Upload/Images/anh-chan-dung-nam.jpeg",
    experience: "4 năm",
  },
];