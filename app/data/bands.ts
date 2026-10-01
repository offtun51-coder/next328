import { Band } from '../types/band';

export const bands: Band[] = [
  {
    id: 1,
    name: 'COCKTAIL',
    genre: 'Rock',
    foundedYear: 2002,
    image: '/images/bands/cock.jpg',
    members: [
      { id: 1, nickname: 'โอม ', name: 'ปัณฑพล ประสารราชกิจ' ,role: 'นักร้องนำ', image: '/images/members/1_1.jpg' },
      { id: 2, nickname: 'เช', name: 'ชวรัตน์ หรรษคุณาฒัย ', role: 'มือกีตาร์', image: '/images/members/2.jpg' },
      { id: 3, nickname: 'ปาร์ค', name: 'เกริกเกียรติ สว่างวงศ์', role: 'มือเบส', image: '/images/members/3.jpg' },
      { id: 4, nickname: 'ฟิลิปส์', name: 'ฟิลิปส์ เปรมสิริกรณ์', role: 'มือกลอง', image: '/images/members/4.jpg' },
      { id: 5, nickname: 'เหน่ง ', name: 'วิวัฒน์ สว่างวรรณรัตน์', role: 'กีตาร์', image: '/images/members/5.jpg' },
      { id: 6, nickname: 'เอ็กซ์', name: 'ชรัณ ตัณฑนันทน์', role: 'เปียโน / คีย์บอร์ด', image: '/images/members/6.jpg' },
    ],
  },
  {
    id: 2,
    name: 'Three Man Down',
    genre: 'Pop Rock / Alternative Rock',
    foundedYear: 2013,
    image: '/images/bands/three.jpg',
    members: [
      { id: 1, nickname: 'กิต ', name: 'กฤตย์ จีรพัฒนานุวงศ' ,role: 'นักร้องนำ', image: '/images/members/7.jpg' },
      { id: 2, nickname: 'ตูน ', name: 'พีรพล เอี่ยมจำรัส ', role: 'มือกีตาร์', image: '/images/members/8.jpg' },
      { id: 3, nickname: 'เต ', name: 'เตธนันท์ วงศ์ปรีชาโชค', role: 'มือกลอง', image: '/images/members/9.jpg' },
      { id: 4, nickname: 'เส็ง  ', name: 'วิศรุต ปฐมสิริไพศาล', role: 'คีย์บอร์ด', image: '/images/members/10.jpg' },
    ],
  },
  {
    id: 3,
    name: 'Loso',
    genre: 'Rock',
    foundedYear: 1996,
    image: '/images/bands/Loso.jpg',
    members: [
      { id: 1, nickname: 'เสก', name: 'เสกสรรค์ ศุขพิมาย' ,role: 'นักร้องนำ/มือกีตาร์', image: '/images/members/11.jpg' },
      { id: 2, nickname: 'ใหญ่', name: 'กิตติศักดิ์ โคตรคำ ', role: 'มือกลอง', image: '/images/members/12.jpg' },
      { id: 3, nickname: 'รัฐ', name: 'อภิรัฐ สุขจิตร์', role: 'มือกีตาร์เบส', image: '/images/members/13.jpg' },  
    ],
  },
];