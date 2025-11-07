/**
 * Constants for Vietnamese Lunar Calendar
 */

import type { Star12Info, God12Info, Construction12Info, Mansion28Info } from './types';

// Lunar year data for 1800-2199
export const TK19: number[] = [
  0x30baa3, 0x56ab50, 0x422ba0, 0x2cab61, 0x52a370, 0x3c51e8, 0x60d160, 0x4ae4b0, 0x376926, 0x58daa0,
  0x445b50, 0x3116d2, 0x562ae0, 0x3ea2e0, 0x28e2d2, 0x4ec950, 0x38d556, 0x5cb520, 0x46b690, 0x325da4,
  0x5855d0, 0x4225d0, 0x2ca5b3, 0x52a2b0, 0x3da8b7, 0x60a950, 0x4ab4a0, 0x35b2a5, 0x5aad50, 0x4455b0,
  0x302b74, 0x562570, 0x4052f9, 0x6452b0, 0x4e6950, 0x386d56, 0x5e5aa0, 0x46ab50, 0x3256d4, 0x584ae0,
  0x42a570, 0x2d4553, 0x50d2a0, 0x3be8a7, 0x60d550, 0x4a5aa0, 0x34ada5, 0x5a95d0, 0x464ae0, 0x2eaab4,
  0x54a4d0, 0x3ed2b8, 0x64b290, 0x4cb550, 0x385757, 0x5e2da0, 0x4895d0, 0x324d75, 0x5849b0, 0x42a4b0,
  0x2da4b3, 0x506a90, 0x3aad98, 0x606b50, 0x4c2b60, 0x359365, 0x5a9370, 0x464970, 0x306964, 0x52e4a0,
  0x3cea6a, 0x62da90, 0x4e5ad0, 0x392ad6, 0x5e2ae0, 0x4892e0, 0x32cad5, 0x56c950, 0x40d4a0, 0x2bd4a3,
  0x50b690, 0x3a57a7, 0x6055b0, 0x4c25d0, 0x3695b5, 0x5a92b0, 0x44a950, 0x2ed954, 0x54b4a0, 0x3cb550,
  0x286b52, 0x4e55b0, 0x3a2776, 0x5e2570, 0x4852b0, 0x32aaa5, 0x56e950, 0x406aa0, 0x2abaa3, 0x50ab50
];

export const TK20: number[] = [
  0x3c4bd8, 0x624ae0, 0x4ca570, 0x3854d5, 0x5cd260, 0x44d950, 0x315554, 0x5656a0, 0x409ad0, 0x2a55d2,
  0x504ae0, 0x3aa5b6, 0x60a4d0, 0x48d250, 0x33d255, 0x58b540, 0x42d6a0, 0x2cada2, 0x5295b0, 0x3f4977,
  0x644970, 0x4ca4b0, 0x36b4b5, 0x5c6a50, 0x466d50, 0x312b54, 0x562b60, 0x409570, 0x2c52f2, 0x504970,
  0x3a6566, 0x5ed4a0, 0x48ea50, 0x336a95, 0x585ad0, 0x442b60, 0x2f86e3, 0x5292e0, 0x3dc8d7, 0x62c950,
  0x4cd4a0, 0x35d8a6, 0x5ab550, 0x4656a0, 0x31a5b4, 0x5625d0, 0x4092d0, 0x2ad2b2, 0x50a950, 0x38b557,
  0x5e6ca0, 0x48b550, 0x355355, 0x584da0, 0x42a5b0, 0x2f4573, 0x5452b0, 0x3ca9a8, 0x60e950, 0x4c6aa0,
  0x36aea6, 0x5aab50, 0x464b60, 0x30aae4, 0x56a570, 0x405260, 0x28f263, 0x4ed940, 0x38db47, 0x5cd6a0,
  0x4896d0, 0x344dd5, 0x5a4ad0, 0x42a4d0, 0x2cd4b4, 0x52b250, 0x3cd558, 0x60b540, 0x4ab5a0, 0x3755a6,
  0x5c95b0, 0x4649b0, 0x30a974, 0x56a4b0, 0x40aa50, 0x29aa52, 0x4e6d20, 0x39ad47, 0x5eab60, 0x489370,
  0x344af5, 0x5a4970, 0x4464b0, 0x2c74a3, 0x50ea50, 0x3d6a58, 0x6256a0, 0x4aaad0, 0x3696d5, 0x5c92e0
];

export const TK21: number[] = [
  0x46c960, 0x2ed954, 0x54d4a0, 0x3eda50, 0x2a7552, 0x4e56a0, 0x38a7a7, 0x5ea5d0, 0x4a92b0, 0x32aab5,
  0x58a950, 0x42b4a0, 0x2cbaa4, 0x50ad50, 0x3c55d9, 0x624ba0, 0x4ca5b0, 0x375176, 0x5c5270, 0x466930,
  0x307934, 0x546aa0, 0x3ead50, 0x2a5b52, 0x504b60, 0x38a6e6, 0x5ea4e0, 0x48d260, 0x32ea65, 0x56d520,
  0x40daa0, 0x2d56a3, 0x5256d0, 0x3c4afb, 0x6249d0, 0x4ca4d0, 0x37d0b6, 0x5ab250, 0x44b520, 0x2edd25,
  0x54b5a0, 0x3e55d0, 0x2a55b2, 0x5049b0, 0x3aa577, 0x5ea4b0, 0x48aa50, 0x33b255, 0x586d20, 0x40ad60,
  0x2d4b63, 0x525370, 0x3e49e8, 0x60c970, 0x4c54b0, 0x3768a6, 0x5ada50, 0x445aa0, 0x2fa6a4, 0x54aad0,
  0x4052e0, 0x28d2e3, 0x4ec950, 0x38d557, 0x5ed4a0, 0x46d950, 0x325d55, 0x5856a0, 0x42a6d0, 0x2c55d4,
  0x5252b0, 0x3ca9b8, 0x62a930, 0x4ab490, 0x34b6a6, 0x5aad50, 0x4655a0, 0x2eab64, 0x54a570, 0x4052b0,
  0x2ab173, 0x4e6930, 0x386b37, 0x5e6aa0, 0x48ad50, 0x332ad5, 0x582b60, 0x42a570, 0x2e52e4, 0x50d160,
  0x3ae958, 0x60d520, 0x4ada90, 0x355aa6, 0x5a56d0, 0x462ae0, 0x30a9d4, 0x54a2d0, 0x3ed150, 0x28e952
];

export const TK22: number[] = [
  0x4eb520, 0x38d727, 0x5eada0, 0x4a55b0, 0x362db5, 0x5a45b0, 0x44a2b0, 0x2eb2b4, 0x54a950, 0x3cb559,
  0x626b20, 0x4cad50, 0x385766, 0x5c5370, 0x484570, 0x326574, 0x5852b0, 0x406950, 0x2a7953, 0x505aa0,
  0x3baaa7, 0x5ea6d0, 0x4a4ae0, 0x35a2e5, 0x5aa550, 0x42d2a0, 0x2de2a4, 0x52d550, 0x3e5abb, 0x6256a0,
  0x4c96d0, 0x3949b6, 0x5e4ab0, 0x46a8d0, 0x30d4b5, 0x56b290, 0x40b550, 0x2a6d52, 0x504da0, 0x3b9567,
  0x609570, 0x4a49b0, 0x34a975, 0x5a64b0, 0x446a90, 0x2cba94, 0x526b50, 0x3e2b60, 0x28ab61, 0x4c9570,
  0x384ae6, 0x5cd160, 0x46e4a0, 0x2eed25, 0x54da90, 0x405b50, 0x2c36d3, 0x502ae0, 0x3a93d7, 0x6092d0,
  0x4ac950, 0x32d556, 0x58b4a0, 0x42b690, 0x2e5d94, 0x5255b0, 0x3e25fa, 0x6425b0, 0x4e92b0, 0x36aab6,
  0x5c6950, 0x4674a0, 0x31b2a5, 0x54ad50, 0x4055a0, 0x2aab73, 0x522570, 0x3a5377, 0x6052b0, 0x4a6950,
  0x346d56, 0x585aa0, 0x42ab50, 0x2e56d4, 0x544ae0, 0x3ca570, 0x2864d2, 0x4cd260, 0x36eaa6, 0x5ad550,
  0x465aa0, 0x30ada5, 0x5695d0, 0x404ad0, 0x2aa9b3, 0x50a4d0, 0x3ad2b7, 0x5eb250, 0x48b540, 0x33d556
];

// Heavenly Stems (Can)
export const CAN: string[] = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];

// Earthly Branches (Chi)
export const CHI: string[] = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

// Chinese Zodiac Animals
export const CHI_ANIMALS: string[] = ["Chuột", "Trâu", "Hổ", "Mèo", "Rồng", "Rắn", "Ngựa", "Dê", "Khỉ", "Gà", "Chó", "Lợn"];

// Days of week (Weekdays)
export const WEEKDAYS: string[] = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

// Auspicious hours by day branch (Giờ Hoàng Đạo)
export const AUSPICIOUS_HOURS: string[] = [
  "110100101100", // Tý
  "001101001011", // Sửu
  "110011010010", // Dần
  "101100110100", // Mão
  "001011001101", // Thìn
  "010010110011", // Tỵ
  "110100101100", // Ngọ
  "001101001011", // Mùi
  "110011010010", // Thân
  "101100110100", // Dậu
  "001011001101", // Tuất
  "010010110011"  // Hợi
];

// Solar terms (Tiết Khí)
export const SOLAR_TERMS: string[] = [
  "Xuân phân", "Thanh minh", "Cốc vũ", "Lập hạ", "Tiểu mãn", "Mang chủng",
  "Hạ chí", "Tiểu thử", "Đại thử", "Lập thu", "Xử thử", "Bạch lộ",
  "Thu phân", "Hàn lộ", "Sương giáng", "Lập đông", "Tiểu tuyết", "Đại tuyết",
  "Đông chí", "Tiểu hàn", "Đại hàn", "Lập xuân", "Vũ Thủy", "Kinh trập"
];

// Five Elements (Ngũ Hành)
export class ELEMENT {
  static readonly WATER = "Thủy" as const;
  static readonly FIRE = "Hỏa" as const;
  static readonly WOOD = "Mộc" as const;
  static readonly METAL = "Kim" as const;
  static readonly EARTH = "Thổ" as const;
}

// Five Elements by Heavenly Stems
export const CAN_ELEMENTS: string[] = [
  ELEMENT.WOOD, ELEMENT.WOOD,     // Giáp, Ất = Mộc
  ELEMENT.FIRE, ELEMENT.FIRE,     // Bính, Đinh = Hỏa
  ELEMENT.EARTH, ELEMENT.EARTH,   // Mậu, Kỷ = Thổ
  ELEMENT.METAL, ELEMENT.METAL,   // Canh, Tân = Kim
  ELEMENT.WATER, ELEMENT.WATER    // Nhâm, Quý = Thủy
];

// Five Elements by Earthly Branches
export const CHI_ELEMENTS: string[] = [
  ELEMENT.WATER, ELEMENT.EARTH,   // Tý = Thủy, Sửu = Thổ
  ELEMENT.WOOD, ELEMENT.WOOD,     // Dần, Mão = Mộc
  ELEMENT.EARTH, ELEMENT.FIRE,    // Thìn = Thổ, Tỵ = Hỏa
  ELEMENT.FIRE, ELEMENT.EARTH,    // Ngọ = Hỏa, Mùi = Thổ
  ELEMENT.METAL, ELEMENT.METAL,   // Thân, Dậu = Kim
  ELEMENT.EARTH, ELEMENT.WATER    // Tuất = Thổ, Hợi = Thủy
];

// 12 Day Officers (12 Sao Kiến Trừ / 12 Stars)
export const STARS_12: Star12Info[] = [
  { name: "Kiến", status: "good", color: "green", description: "Khai trương, cưới hỏi, xuất hành, xây dựng" },
  { name: "Trừ", status: "bad", color: "red", description: "Xấu, chỉ tốt cho trừ bệnh, dọn dẹp, phá cũ" },
  { name: "Mãn", status: "good", color: "green", description: "Tốt cho hội họp, cưới hỏi, khánh thành, cầu tài" },
  { name: "Bình", status: "neutral", color: "orange", description: "Trung bình, an táng, tu bổ" },
  { name: "Định", status: "good", color: "green", description: "Tốt cho ký kết, cưới hỏi, xây dựng, khai trương" },
  { name: "Chấp", status: "neutral", color: "orange", description: "Tốt cho xây dựng, an táng, không tốt cho xuất hành" },
  { name: "Phá", status: "bad", color: "red", description: "Rất xấu, tránh mọi việc quan trọng" },
  { name: "Nguy", status: "bad", color: "red", description: "Nguy hiểm, tránh xuất hành, động thổ, cưới hỏi" },
  { name: "Thành", status: "good", color: "green", description: "Rất tốt, mọi việc đều thuận lợi" },
  { name: "Thu", status: "good", color: "green", description: "Tốt cho thu hoạch, kết quả, cầu tài" },
  { name: "Khai", status: "good", color: "green", description: "Khai trương, xuất hành, khai công, mọi việc đều tốt" },
  { name: "Bế", status: "bad", color: "red", description: "Đóng cửa, tránh mọi việc quan trọng, chỉ tốt cho tu tâm" }
];

// 12 Day Construction (Thập Nhị Trực / 12 Constructions)
export const CONSTRUCTIONS_12: Construction12Info[] = [
  {
    name: "Trực kiến",
    good_for: ["Động thổ", "san nền đắp nền", "lên quan nhậm chức", "xuất hành", "khai trương tàu thuyền", "khởi công làm lò"],
    bad_for: ["Khai trương", "khởi công xây cất và chôn cất"]
  },
  {
    name: "Trực trừ",
    good_for: ["Giải trừ", "tắm gội", "chỉnh dung", "cạo đầu", "chỉnh tay chân móng", "cầu y trị bệnh", "quét dọn nhà cửa"],
    bad_for: ["Mọi việc khác"]
  },
  {
    name: "Trực mãn",
    good_for: ["Tiến người", "may cắt", "dựng cột lên đòn dông", "kinh vệ", "khai trương", "lập khoán giao dịch", "nạp tài", "mở kho", "đắp lỗ lỗ rác", "sửa tường"],
    bad_for: ["Tế tự", "cầu phúc", "cầu tự", "lên sách chương biểu", "ban chiếu", "ban ơn", "chiêu hiền cử nhân", "cất chính tà", "lên quan lâm chính", "hôn nhân kết hôn", "cầu y trị bệnh"]
  },
  {
    name: "Trực bình",
    good_for: ["Tu sửa tường tường", "bình trị đạo đồ"],
    bad_for: ["Cầu phúc cầu tự", "lên sách lên chương biểu", "ban chiếu", "ban ơn", "chiêu hiền cử nhân", "tuyên chính sự", "bố chính sự", "khánh tứ", "yến hội", "quan đái", "xuất hành", "an phủ biên cảnh", "tuyển tướng xuất sư", "lên quan lâm chính", "hôn nhân kết hôn", "nạp thái", "giá thú", "tiến người", "di chuyển", "an sàng", "giải trừ", "cầu y trị bệnh", "may cắt", "doanh kiến tu cung thất", "thiện thành quách", "trúc đê phòng tu tạo", "dựng cột lên đòn dông", "tu kho", "cổ đúc", "kinh vệ", "uẩn niệu", "khai trương lập khoán giao dịch", "nạp tài", "mở kho", "tu trí sản thất", "khai cừ xuyên giếng", "sưu tất phá thổ an táng", "khải san"]
  },
  {
    name: "Trực định",
    good_for: ["Quan đái"],
    bad_for: ["Mọi việc khác"]
  },
  {
    name: "Trực chấp",
    good_for: ["Bắt bớ"],
    bad_for: ["Mọi việc khác"]
  },
  {
    name: "Trực phá",
    good_for: ["Cầu y trị bệnh"],
    bad_for: ["Mọi việc khác"]
  },
  {
    name: "Trực nguy",
    good_for: ["An phủ biên cảnh", "tuyển tướng", "an sàng"],
    bad_for: ["Mọi việc khác"]
  },
  {
    name: "Trực thành",
    good_for: ["Nhập học", "an phủ biên cảnh", "di chuyển", "trúc đê phòng", "khai trương"],
    bad_for: ["Mọi việc khác"]
  },
  {
    name: "Trực thu",
    good_for: ["Tiến người", "nạp tài", "bắt bớ", "thu tất"],
    bad_for: ["Cầu phúc cầu tự", "lên sách lên chương biểu", "ban chiếu", "ban ơn", "chiêu hiền cử nhân", "tuyên chính sự", "bố chính sự", "khánh tứ", "yến hội", "quan đái", "xuất hành", "an phủ biên cảnh", "tuyển tướng xuất sư", "lên quan lâm chính", "hôn nhân kết hôn", "nạp thái", "giá thú", "di chuyển", "an sàng", "giải trừ", "cầu y trị bệnh", "may cắt", "doanh kiến tu cung thất", "thiện thành quách", "trúc đê phòng tu tạo", "dựng cột lên đòn dông", "cổ đúc", "kinh vệ", "uẩn niệu", "khai trương lập khoán giao dịch", "mở kho", "tu trí sản thất", "khai cừ xuyên giếng", "phá thổ an táng khải san"]
  },
  {
    name: "Trực khai",
    good_for: ["Tế tự", "cầu phúc", "cầu tự", "lên sách lên chương biểu", "ban chiếu", "ban ơn", "chiêu hiền cử nhân", "tuyên chính sự", "tất cô lân", "tuyên chính sự", "tuyết oan", "khánh tứ", "yến hội", "nhập học", "xuất hành", "lên quan lâm chính", "di chuyển", "giải trừ", "cầu y trị bệnh", "may cắt", "tu cung thất", "thiện thành quách", "tu tạo", "tu kho", "khai trương", "tu trí sản thất", "khai cừ xuyên giếng", "an ngại", "sưu tất", "mục dưỡng"],
    bad_for: ["Mọi việc khác"]
  },
  {
    name: "Trực bế",
    good_for: ["Trúc đê phòng", "đắp lỗ", "sửa tường"],
    bad_for: ["Lên sách lên chương biểu", "ban chiếu", "ban ơn", "chiêu hiền cử nhân", "tuyên chính sự", "bố chính sự", "khánh tứ", "yến hội", "xuất hành", "xuất sư", "lên quan lâm chính", "hôn nhân kết hôn", "nạp thái", "giá thú", "tiến người", "di chuyển", "an sàng", "cầu y trị bệnh", "trị mục", "doanh kiến tu cung thất", "tu tạo", "dựng cột lên đòn dông", "khai trương", "mở kho", "tu trí sản thất", "khai cừ xuyên giếng"]
  }
];

// 12 Gods (Hoàng Đạo / Hắc Đạo)
export const GODS_12: God12Info[] = [
  { name: "Thanh Long", type: "auspicious", status: "good", description: "Hoàng Đạo - Tốt cho mọi việc" },
  { name: "Minh Đường", type: "auspicious", status: "good", description: "Hoàng Đạo - Tốt cho gặp gỡ, văn thư" },
  { name: "Thiên Hình", type: "inauspicious", status: "bad", description: "Hắc Đạo - Xấu, tránh kiện tụng" },
  { name: "Chu Tước", type: "inauspicious", status: "bad", description: "Hắc Đạo - Xấu, tránh tranh cãi" },
  { name: "Kim Quỹ", type: "auspicious", status: "good", description: "Hoàng Đạo - Tốt cho cầu tài, xuất hành" },
  { name: "Thiên Đức", type: "auspicious", status: "good", description: "Hoàng Đạo - Rất tốt, quý nhân giúp đỡ" },
  { name: "Bạch Hổ", type: "inauspicious", status: "bad", description: "Hắc Đạo - Rất xấu, tránh mọi việc" },
  { name: "Ngọc Đường", type: "auspicious", status: "good", description: "Hoàng Đạo - Tốt cho cưới hỏi, gia đạo" },
  { name: "Thiên Lao", type: "inauspicious", status: "bad", description: "Hắc Đạo - Xấu, tránh kiện tụng" },
  { name: "Huyền Vũ", type: "inauspicious", status: "bad", description: "Hắc Đạo - Xấu, cẩn thận trộm cắp" },
  { name: "Tư Mệnh", type: "auspicious", status: "good", description: "Hoàng Đạo - Tốt cho quan chức, công việc" },
  { name: "Câu Trần", type: "inauspicious", status: "bad", description: "Hắc Đạo - Xấu, tránh xuất hành" }
];

// 60 Nayin
export const NAYIN_60: string[] = [
  "Hải Trung Kim", "Lư Trung Hỏa", "Đại Lâm Mộc", "Lộ Bàng Thổ", "Kiếm Phong Kim",
  "Sơn Đầu Hỏa", "Giản Hạ Thủy", "Thành Đầu Thổ", "Bạch Lạp Kim", "Dương Liễu Mộc",
  "Tuyền Trung Thủy", "Ốc Thượng Thổ", "Tích Lịch Hỏa", "Tòng Bách Mộc", "Trường Lưu Thủy",
  "Sa Trung Kim", "Sơn Hạ Hỏa", "Bình Địa Mộc", "Bích Thượng Thổ", "Kim Bạc Kim",
  "Phúc Đăng Hỏa", "Thiên Hà Thủy", "Đại Trạch Thổ", "Thoa Xuyến Kim", "Tang Đố Mộc",
  "Đại Khê Thủy", "Sa Trung Thổ", "Thiên Thượng Hỏa", "Thạch Lựu Mộc", "Đại Hải Thủy"
];

// 28 Lunar Mansions (28 Tú Sao)
export const MANSIONS_28: Mansion28Info[] = [
  { name: "Giác", animal: "Giao", element: "Mộc", good: true, description: "Tốt cho mọi việc, khai trương, cầu tài" },
  { name: "Cang", animal: "Rồng", element: "Kim", good: true, description: "Hoàng Đạo - Tốt, quý nhân giúp đỡ, cầu quan" },
  { name: "Đê", animal: "Lạc", element: "Thổ", good: false, description: "Hắc Đạo - Xấu, tranh tụng, bệnh tật" },
  { name: "Phòng", animal: "Thỏ", element: "Nhật", good: true, description: "Hoàng Đạo - Tốt cho xây dựng, cưới hỏi" },
  { name: "Tâm", animal: "Cáo", element: "Nguyệt", good: false, description: "Hắc Đạo - Xấu, cẩn thận tai họa" },
  { name: "Vĩ", animal: "Hổ", element: "Hỏa", good: true, description: "Hoàng Đạo - Tốt, hưng vượng, cầu tài" },
  { name: "Cơ", animal: "Báo", element: "Thủy", good: true, description: "Hoàng Đạo - Tốt cho xuất hành, gặp gỡ" },
  { name: "Đẩu", animal: "Giải", element: "Mộc", good: true, description: "Hoàng Đạo - Tốt, may mắn, cầu phúc" },
  { name: "Ngưu", animal: "Trâu", element: "Kim", good: false, description: "Hắc Đạo - Xấu, tránh cưới hỏi" },
  { name: "Nữ", animal: "Dơi", element: "Thổ", good: false, description: "Hắc Đạo - Xấu cho công việc, xuất hành" },
  { name: "Hư", animal: "Chuột", element: "Nhật", good: false, description: "Hắc Đạo - Xấu, tang ma, bệnh tật" },
  { name: "Nguy", animal: "Yến", element: "Nguyệt", good: false, description: "Hắc Đạo - Nguy hiểm, tai nạn" },
  { name: "Thất", animal: "Lợn", element: "Hỏa", good: true, description: "Hoàng Đạo - Tốt cho gia đạo, cúng tế" },
  { name: "Bích", animal: "Dùn", element: "Thủy", good: true, description: "Hoàng Đạo - Tốt, phát tài, thịnh vượng" },
  { name: "Khuê", animal: "Sói", element: "Mộc", good: false, description: "Hắc Đạo - Xấu, lừa đảo, thất bại" },
  { name: "Lâu", animal: "Chó", element: "Kim", good: true, description: "Hoàng Đạo - Tốt cho xuất hành, cầu phúc" },
  { name: "Vị", animal: "Trĩ", element: "Thổ", good: true, description: "Hoàng Đạo - Tốt, may mắn, khai trương" },
  { name: "Mão", animal: "Gà", element: "Nhật", good: false, description: "Hắc Đạo - Xấu cho gia đạo, cưới hỏi" },
  { name: "Tất", animal: "Quạ", element: "Nguyệt", good: true, description: "Hoàng Đạo - Tốt, săn bắt, xuất hành" },
  { name: "Chủy", animal: "Khỉ", element: "Hỏa", good: false, description: "Hắc Đạo - Xấu, tang tóc, tránh cưới hỏi" },
  { name: "Sâm", animal: "Vượn", element: "Thủy", good: true, description: "Hoàng Đạo - Tốt cho công danh, học hành" },
  { name: "Tỉnh", animal: "Hãn", element: "Mộc", good: false, description: "Hắc Đạo - Xấu cho sức khỏe, bệnh tật" },
  { name: "Quỷ", animal: "Dê", element: "Kim", good: false, description: "Hắc Đạo - Rất xấu, ma quỷ, tang tóc" },
  { name: "Liễu", animal: "Nai", element: "Thổ", good: false, description: "Hắc Đạo - Xấu cho mọi việc, tránh cưới hỏi" },
  { name: "Tinh", animal: "Ngựa", element: "Nhật", good: false, description: "Hắc Đạo - Xấu, quan tai, kiện tụng" },
  { name: "Trương", animal: "Nai", element: "Nguyệt", good: true, description: "Hoàng Đạo - Tốt, thịnh vượng, khai trương" },
  { name: "Dực", animal: "Rắn", element: "Hỏa", good: true, description: "Hoàng Đạo - Tốt cho tài lộc, cưới hỏi" },
  { name: "Chẩn", animal: "Giun", element: "Thủy", good: true, description: "Hoàng Đạo - Tốt, hưng vượng, xây dựng" }
];

// Direction names (8 hướng)
export const DIRECTIONS = ["Bắc", "Đông Bắc", "Đông", "Đông Nam", "Nam", "Tây Nam", "Tây", "Tây Bắc"];

// Ngọc Hạp Thông Thư (Direction by day Chi)
export const DIRECTION_MAP: Record<string, { good: string[], bad: string[] }> = {
  "Tý": { good: ["Đông", "Tây", "Nam"], bad: ["Bắc", "Đông Bắc", "Tây Bắc", "Đông Nam", "Tây Nam"] },
  "Sửu": { good: ["Đông", "Nam", "Tây"], bad: ["Bắc", "Đông Bắc", "Tây Bắc", "Đông Nam", "Tây Nam"] },
  "Dần": { good: ["Đông", "Nam", "Bắc"], bad: ["Tây", "Đông Bắc", "Tây Bắc", "Đông Nam", "Tây Nam"] },
  "Mão": { good: ["Bắc", "Nam", "Tây"], bad: ["Đông", "Đông Bắc", "Tây Bắc", "Đông Nam", "Tây Nam"] },
  "Thìn": { good: ["Bắc", "Đông", "Tây"], bad: ["Nam", "Đông Bắc", "Tây Bắc", "Đông Nam", "Tây Nam"] },
  "Tỵ": { good: ["Bắc", "Đông", "Nam"], bad: ["Tây", "Đông Bắc", "Tây Bắc", "Đông Nam", "Tây Nam"] },
  "Ngọ": { good: ["Đông", "Tây", "Bắc"], bad: ["Nam", "Đông Bắc", "Tây Bắc", "Đông Nam", "Tây Nam"] },
  "Mùi": { good: ["Đông", "Bắc", "Tây"], bad: ["Nam", "Đông Bắc", "Tây Bắc", "Đông Nam", "Tây Nam"] },
  "Thân": { good: ["Bắc", "Nam", "Đông"], bad: ["Tây", "Đông Bắc", "Tây Bắc", "Đông Nam", "Tây Nam"] },
  "Dậu": { good: ["Bắc", "Nam", "Tây"], bad: ["Đông", "Đông Bắc", "Tây Bắc", "Đông Nam", "Tây Nam"] },
  "Tuất": { good: ["Đông", "Tây", "Nam"], bad: ["Bắc", "Đông Bắc", "Tây Bắc", "Đông Nam", "Tây Nam"] },
  "Hợi": { good: ["Đông", "Nam", "Bắc"], bad: ["Tây", "Đông Bắc", "Tây Bắc", "Đông Nam", "Tây Nam"] }
};

// Hướng Thần Tài, Hỷ Thần, Phúc Thần theo Can Ngày
export const WEALTH_GOD_DIR = ["Đông Bắc", "Đông", "Đông Nam", "Nam", "Nam", "Tây Nam", "Tây", "Tây Bắc", "Bắc", "Bắc"];
export const JOY_GOD_DIR = ["Đông Nam", "Đông Nam", "Nam", "Nam", "Đông Bắc", "Đông", "Tây Bắc", "Tây", "Tây Nam", "Tây"];
export const FORTUNE_GOD_DIR = ["Bắc", "Tây Nam", "Đông Nam", "Đông", "Đông Bắc", "Nam", "Tây", "Tây Bắc", "Tây Nam", "Đông Nam"];

// Travel hours by Ly Thuan Phong
export const TRAVEL_HOURS_LY: Record<number, number[]> = {
  0: [0, 2, 3, 6, 7, 9],
  6: [0, 2, 3, 6, 7, 9],
  1: [1, 2, 5, 6, 8, 11],
  7: [1, 2, 5, 6, 8, 11],
  2: [0, 1, 4, 5, 9, 10],
  8: [0, 1, 4, 5, 9, 10],
  3: [0, 3, 4, 7, 8, 11],
  9: [0, 3, 4, 7, 8, 11],
  4: [1, 3, 5, 7, 9, 11],
  10: [1, 3, 5, 7, 9, 11],
  5: [0, 2, 4, 6, 8, 10],
  11: [0, 2, 4, 6, 8, 10]
};

// Constants
export const PI = Math.PI;
export const FIRST_DAY = 2378497; // jdn(25, 1, 1800)
export const LAST_DAY = 2524502; // jdn(31, 12, 2199)
