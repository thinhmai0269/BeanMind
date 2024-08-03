interface Lesson {
  lesson: string;
  status: boolean;
}

interface Chapter {
  chapter: string;
  detail: Lesson[];
}

 export const data:any =[
    {
      chapter: "Bài 1: toán + 1 số",
      detail: [
        { lesson: "+ nhu nao1", status: true },
        { lesson: "+ nhieu so", status: false },
        { lesson: "+ nâng cao", status: false },
      ],
    },
    {
      chapter: "Bài 2: toán - 1 số",
      detail: [
        { lesson: "+ nhu nao2", status: true },
        { lesson: "+ nhieu so", status: false },
        { lesson: "+ nâng cao", status: false },
      ],
    },
    {
      chapter: "Bài 3: toán * 1 số",
      detail: [
        { lesson: "+ nhu nao3", status: true },
        { lesson: "+ nhieu so", status: false },
        { lesson: "+ nâng cao", status: false },
      ],
    },
    {
      chapter: "Bài 4: toán / 1 số",
      detail: [
        { lesson: "+ nhu nao4", status: true },
        { lesson: "+ nhieu so", status: false },
        { lesson: "+ nâng cao", status: false },
      ],
    },
  ];
