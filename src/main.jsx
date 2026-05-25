
import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const initialRestaurants = [
  "Большая Дмитровка",
  "Патриаршие",
  "Депо. Три вокзала",
  "Фудмолл Депо",
  "ТРЦ Европейский",
];


const restaurantTranslations = {
  "Большая Дмитровка": "Bolshaya Dmitrovka",
  "Патриаршие": "Patriarch Ponds",
  "Депо. Три вокзала": "Depot. Three Stations",
  "Фудмолл Депо": "Depo Foodmall",
  "ТРЦ Европейский": "Evropeyskiy Mall",
};

const dishNameTranslations = {
  "Мидии: Сливки, петрушка": "Mussels: Cream, parsley",
  "Мидии: Чёрные мидии": "Mussels: Black mussels",
  "Мидии: Карбонара": "Mussels: Carbonara",
  "Мидии: Том-ям": "Mussels: Tom yum",
  "Мидии: Блючиз": "Mussels: Blue cheese",
  "Мидии: Аррабиата": "Mussels: Arrabbiata",
  "Устрица Императорская": "Imperial oyster",
  "Устрица Галлахер": "Gallagher oyster",
  "Устрица Розовая Джоли": "Pink Jolie oyster",
  "Морской ёж, перепелиный желток, огурец, понзу": "Sea urchin, quail yolk, cucumber, ponzu",
  "Креветки на льду": "Shrimps on ice",
  "Севиче сибас, индийский пани пури": "Sea bass ceviche, Indian pani puri",
  "Севиче из гребешка с чёрным трюфелем": "Scallop ceviche with black truffle",
  "Тартар из лосося, роти": "Salmon tartare, roti",
  "Тартар тунец, нори, сгущёнка-васаби, красная икра": "Tuna tartare, nori, wasabi condensed milk, red caviar",
  "Татаки лосось, гуакамоле, начос, понзу": "Salmon tataki, guacamole, nachos, ponzu",
  "Зелёный салат с ореховой заправкой шисо-оливковое масло": "Green salad with nut dressing and shiso olive oil",
  "Каталонский салат с крабом": "Catalan crab salad",
  "Страчателла, хрустящий баклажан, манго, креветки": "Stracciatella, crispy eggplant, mango, shrimps",
  "Салат с креветкой, авокадо, апельсин, имбирный крем": "Shrimp salad with avocado, orange and ginger cream",
  "Чебуреки с крабом и лангустином": "Chebureki with crab and langoustine",
  "Креветки попкорн": "Popcorn shrimps",
  "Креветки на гриле, перуанский соус": "Grilled shrimps, Peruvian sauce",
  "Гёдза с крабом и трюфелем": "Gyoza with crab and truffle",
  "Суп том-ям с креветками и мини-кальмаром": "Tom yum soup with shrimps and baby squid",
  "Сырный суп с морепродуктами": "Cheese soup with seafood",
  "Рамен с морепродуктами": "Seafood ramen",
  "Итальянский рыбный суп": "Italian fish soup",
  "Тальятелле Mollusca с крабом": "Mollusca tagliatelle with crab",
  "Орзо с морепродуктами": "Orzo with seafood",
  "Аррабиата орекьетте с креветками и страчателлой": "Arrabbiata orecchiette with shrimps and stracciatella",
  "Жареный осьминог, пюре-пармезан, икорный соус": "Grilled octopus, parmesan purée, caviar sauce",
  "Лосось на гриле, пюре сельдерей-яблоко, шисо, грибы": "Grilled salmon, celery-apple purée, shiso, mushrooms",
  "Сибас, японский рис, свежий салат": "Sea bass, Japanese rice, fresh salad",
  "Краб запечённый в спайси соусе": "Crab baked in spicy sauce",
  "Тирамису от шефа": "Chef’s tiramisu",
  "Японские пончики, малиновый джем, кунжутное мороженое": "Japanese doughnuts, raspberry jam, sesame ice cream",
  "Крем-брюле с сезонными ягодами": "Crème brûlée with seasonal berries",
  "Яблочный пирог с мороженым": "Apple pie with ice cream",
  "Милфей с ягодами, матча": "Mille-feuille with berries and matcha",
};

function getRestaurantName(name, lang) {
  return lang === "en" ? (restaurantTranslations[name] || name) : name;
}

function getCategoryName(category, lang) {
  return lang === "en" ? (category.labelEn || category.label) : category.label;
}

function getDishName(dish, lang) {
  return lang === "en" ? (dish.nameEn || dishNameTranslations[dish.name] || dish.name) : dish.name;
}

function getDishNote(dish, lang) {
  return lang === "en" ? (dish.noteEn || dish.note) : dish.note;
}


const initialCategories = [
  { id: "all", label: "Всё", labelEn: "All" },
  { id: "ice", label: "Лёд", labelEn: "Ice" },
  { id: "raw", label: "Raw", labelEn: "Raw" },
  { id: "salads", label: "Салаты", labelEn: "Salads" },
  { id: "starters", label: "Закуски", labelEn: "Starters" },
  { id: "soups", label: "Супы", labelEn: "Soups" },
  { id: "hot", label: "Горячее", labelEn: "Hot dishes" },
  { id: "mussels", label: "Мидии", labelEn: "Mussels" },
  { id: "desserts", label: "Десерты", labelEn: "Desserts" },
];

const initialDishes = [
  { id: 1, restaurant: "Большая Дмитровка", name: "Мидии: Сливки, петрушка", price: 2200, weight: "500 г", category: "mussels", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1200&auto=format&fit=crop", kcal: 176, protein: 15, fat: 11, carbs: 5, note: "Сливочные мидии с петрушкой. Цена указана за 500 г." },
  { id: 2, restaurant: "Большая Дмитровка", name: "Мидии: Чёрные мидии", price: 2400, weight: "500 г", category: "mussels", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=1200&auto=format&fit=crop", kcal: 164, protein: 17, fat: 8, carbs: 6, note: "Классический насыщенный вкус чёрных мидий." },
  { id: 3, restaurant: "Большая Дмитровка", name: "Мидии: Карбонара", price: 2200, weight: "500 г", category: "mussels", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=1200&auto=format&fit=crop", kcal: 218, protein: 16, fat: 15, carbs: 6, note: "Мидии в стиле карбонара. Цена указана за 500 г." },
  { id: 4, restaurant: "Большая Дмитровка", name: "Мидии: Том-ям", price: 2400, weight: "500 г", category: "mussels", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1200&auto=format&fit=crop", kcal: 188, protein: 14, fat: 10, carbs: 9, note: "Азиатский соус том-ям с яркой кислотностью и лёгкой остротой." },
  { id: 5, restaurant: "Большая Дмитровка", name: "Мидии: Блючиз", price: 2300, weight: "500 г", category: "mussels", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1200&auto=format&fit=crop", kcal: 226, protein: 16, fat: 16, carbs: 5, note: "Мидии в плотном сырном соусе блю чиз." },
  { id: 6, restaurant: "Большая Дмитровка", name: "Мидии: Аррабиата", price: 2200, weight: "500 г", category: "mussels", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop", kcal: 171, protein: 15, fat: 8, carbs: 10, note: "Томатный соус аррабиата с пикантной остротой." },
  { id: 7, restaurant: "Большая Дмитровка", name: "Устрица Императорская", price: 450, weight: "1 шт.", category: "ice", image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=1200&auto=format&fit=crop", kcal: 59, protein: 9, fat: 2, carbs: 4, note: "Орехово-сливочные нотки." },
  { id: 8, restaurant: "Большая Дмитровка", name: "Устрица Галлахер", price: 690, weight: "1 шт.", category: "ice", image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?q=80&w=1200&auto=format&fit=crop", kcal: 61, protein: 9, fat: 2, carbs: 5, note: "Ирландская сладость." },
  { id: 9, restaurant: "Большая Дмитровка", name: "Устрица Розовая Джоли", price: 590, weight: "1 шт.", category: "ice", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=1200&auto=format&fit=crop", kcal: 57, protein: 8, fat: 2, carbs: 4, note: "Солёная карамель во вкусе." },
  { id: 10, restaurant: "Большая Дмитровка", name: "Морской ёж, перепелиный желток, огурец, понзу", price: 590, weight: "80 г", category: "ice", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200&auto=format&fit=crop", kcal: 112, protein: 12, fat: 6, carbs: 3, note: "Морской ёж с понзу и свежим огурцом." },
  { id: 11, restaurant: "Большая Дмитровка", name: "Креветки на льду", price: 3600, weight: "1/2 кг", category: "ice", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=1200&auto=format&fit=crop", kcal: 99, protein: 21, fat: 1, carbs: 1, note: "Цена указана за половину килограмма." },
  { id: 12, restaurant: "Большая Дмитровка", name: "Севиче сибас, индийский пани пури", price: 1600, weight: "180 г", category: "raw", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1200&auto=format&fit=crop", kcal: 142, protein: 18, fat: 5, carbs: 8, note: "Севиче из сибаса с индийским пани пури." },
  { id: 13, restaurant: "Большая Дмитровка", name: "Севиче из гребешка с чёрным трюфелем", price: 1650, weight: "150 г", category: "raw", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop", kcal: 136, protein: 16, fat: 6, carbs: 5, note: "Гребешок, трюфель и свежая кислотность." },
  { id: 14, restaurant: "Большая Дмитровка", name: "Тартар из лосося, роти", price: 1350, weight: "160 г", category: "raw", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop", kcal: 198, protein: 18, fat: 12, carbs: 7, note: "Тартар из лосося с роти." },
  { id: 15, restaurant: "Большая Дмитровка", name: "Тартар тунец, нори, сгущёнка-васаби, красная икра", price: 1150, weight: "150 г", category: "raw", image: "https://images.unsplash.com/photo-1563612116625-3012372fccce?q=80&w=1200&auto=format&fit=crop", kcal: 174, protein: 20, fat: 8, carbs: 6, note: "Тунец, нори, сгущёнка-васаби и красная икра." },
  { id: 16, restaurant: "Большая Дмитровка", name: "Татаки лосось, гуакамоле, начос, понзу", price: 1450, weight: "180 г", category: "raw", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop", kcal: 221, protein: 19, fat: 14, carbs: 8, note: "Лосось, гуакамоле, начос и соус понзу." },
  { id: 17, restaurant: "Большая Дмитровка", name: "Зелёный салат с ореховой заправкой шисо-оливковое масло", price: 950, weight: "180 г", category: "salads", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop", kcal: 156, protein: 5, fat: 12, carbs: 8, note: "Лёгкий зелёный салат с ореховой заправкой." },
  { id: 18, restaurant: "Большая Дмитровка", name: "Каталонский салат с крабом", price: 1900, weight: "220 г", category: "salads", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop", kcal: 188, protein: 16, fat: 10, carbs: 8, note: "Крабовый салат в каталонском стиле." },
  { id: 19, restaurant: "Большая Дмитровка", name: "Страчателла, хрустящий баклажан, манго, креветки", price: 1500, weight: "230 г", category: "salads", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1200&auto=format&fit=crop", kcal: 241, protein: 14, fat: 17, carbs: 10, note: "Страчателла с баклажаном, манго и креветками." },
  { id: 20, restaurant: "Большая Дмитровка", name: "Салат с креветкой, авокадо, апельсин, имбирный крем", price: 1450, weight: "210 г", category: "salads", image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1200&auto=format&fit=crop", kcal: 205, protein: 15, fat: 13, carbs: 9, note: "Креветка, авокадо, апельсин и имбирный крем." },
  { id: 21, restaurant: "Большая Дмитровка", name: "Чебуреки с крабом и лангустином", price: 1050, weight: "180 г", category: "starters", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop", kcal: 286, protein: 15, fat: 17, carbs: 18, note: "Хрустящие чебуреки с крабом и лангустином." },
  { id: 22, restaurant: "Большая Дмитровка", name: "Креветки попкорн", price: 1400, weight: "190 г", category: "starters", image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1200&auto=format&fit=crop", kcal: 312, protein: 18, fat: 18, carbs: 20, note: "Хрустящие креветки в формате попкорна." },
  { id: 23, restaurant: "Большая Дмитровка", name: "Креветки на гриле, перуанский соус", price: 1200, weight: "180 г", category: "starters", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=1200&auto=format&fit=crop", kcal: 178, protein: 24, fat: 7, carbs: 5, note: "Креветки на гриле с перуанским соусом." },
  { id: 24, restaurant: "Большая Дмитровка", name: "Гёдза с крабом и трюфелем", price: 1600, weight: "170 г", category: "starters", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=1200&auto=format&fit=crop", kcal: 246, protein: 14, fat: 11, carbs: 23, note: "Гёдза с крабом и свежим трюфелем." },
  { id: 25, restaurant: "Большая Дмитровка", name: "Суп том-ям с креветками и мини-кальмаром", price: 1480, weight: "350 г", category: "soups", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1200&auto=format&fit=crop", kcal: 138, protein: 12, fat: 7, carbs: 8, note: "Том-ям с креветками и мини-кальмаром." },
  { id: 26, restaurant: "Большая Дмитровка", name: "Сырный суп с морепродуктами", price: 1050, weight: "330 г", category: "soups", image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop", kcal: 196, protein: 13, fat: 13, carbs: 7, note: "Сырный суп с морепродуктами." },
  { id: 27, restaurant: "Большая Дмитровка", name: "Рамен с морепродуктами", price: 1200, weight: "420 г", category: "soups", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1200&auto=format&fit=crop", kcal: 212, protein: 14, fat: 8, carbs: 22, note: "Рамен с морепродуктами." },
  { id: 28, restaurant: "Большая Дмитровка", name: "Итальянский рыбный суп", price: 1550, weight: "380 г", category: "soups", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200&auto=format&fit=crop", kcal: 168, protein: 17, fat: 7, carbs: 9, note: "Итальянский рыбный суп." },
  { id: 29, restaurant: "Большая Дмитровка", name: "Тальятелле Mollusca с крабом", price: 1900, weight: "300 г", category: "hot", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1200&auto=format&fit=crop", kcal: 312, protein: 18, fat: 16, carbs: 28, note: "Фирменные тальятелле Mollusca с крабом." },
  { id: 30, restaurant: "Большая Дмитровка", name: "Орзо с морепродуктами", price: 1550, weight: "290 г", category: "hot", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1200&auto=format&fit=crop", kcal: 286, protein: 17, fat: 12, carbs: 27, note: "Орзо с миксом морепродуктов." },
  { id: 31, restaurant: "Большая Дмитровка", name: "Аррабиата орекьетте с креветками и страчателлой", price: 1450, weight: "310 г", category: "hot", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop", kcal: 326, protein: 18, fat: 15, carbs: 31, note: "Орекьетте в соусе аррабиата с креветками и страчателлой." },
  { id: 32, restaurant: "Большая Дмитровка", name: "Жареный осьминог, пюре-пармезан, икорный соус", price: 2550, weight: "260 г", category: "hot", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=1200&auto=format&fit=crop", kcal: 244, protein: 24, fat: 12, carbs: 10, note: "Осьминог с пюре-пармезан и икорным соусом." },
  { id: 33, restaurant: "Большая Дмитровка", name: "Лосось на гриле, пюре сельдерей-яблоко, шисо, грибы", price: 1900, weight: "280 г", category: "hot", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop", kcal: 268, protein: 24, fat: 16, carbs: 8, note: "Лосось на гриле с пюре сельдерей-яблоко, шисо и грибами." },
  { id: 34, restaurant: "Большая Дмитровка", name: "Сибас, японский рис, свежий салат", price: 2000, weight: "300 г", category: "hot", image: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?q=80&w=1200&auto=format&fit=crop", kcal: 236, protein: 25, fat: 9, carbs: 16, note: "Сибас с японским рисом и свежим салатом." },
  { id: 35, restaurant: "Большая Дмитровка", name: "Краб запечённый в спайси соусе", price: 4300, weight: "320 г", category: "hot", image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=1200&auto=format&fit=crop", kcal: 254, protein: 27, fat: 14, carbs: 6, note: "Запечённый краб в спайси соусе." },
  { id: 36, restaurant: "Большая Дмитровка", name: "Тирамису от шефа", price: 980, weight: "160 г", category: "desserts", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1200&auto=format&fit=crop", kcal: 318, protein: 6, fat: 20, carbs: 29, note: "Тирамису от шефа." },
  { id: 37, restaurant: "Большая Дмитровка", name: "Японские пончики, малиновый джем, кунжутное мороженое", price: 1080, weight: "190 г", category: "desserts", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop", kcal: 356, protein: 7, fat: 18, carbs: 42, note: "Японские пончики с джемом, солёной карамелью и мороженым." },
  { id: 38, restaurant: "Большая Дмитровка", name: "Крем-брюле с сезонными ягодами", price: 980, weight: "150 г", category: "desserts", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1200&auto=format&fit=crop", kcal: 296, protein: 5, fat: 18, carbs: 28, note: "Крем-брюле с сезонными ягодами." },
  { id: 39, restaurant: "Большая Дмитровка", name: "Яблочный пирог с мороженым", price: 980, weight: "180 г", category: "desserts", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1200&auto=format&fit=crop", kcal: 342, protein: 5, fat: 16, carbs: 45, note: "Яблочный пирог с ванильным мороженым." },
  { id: 40, restaurant: "Большая Дмитровка", name: "Милфей с ягодами, матча", price: 880, weight: "150 г", category: "desserts", image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?q=80&w=1200&auto=format&fit=crop", kcal: 304, protein: 5, fat: 17, carbs: 34, note: "Милфей с ягодами и матча." },
];

function uid() {
  return Date.now() + Math.floor(Math.random() * 100000);
}

function safeLocalGet(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function useLocalStorageState(key, fallback) {
  const [value, setValue] = useState(() => safeLocalGet(key, fallback));
  const update = (next) => {
    setValue(next);
    localStorage.setItem(key, JSON.stringify(next));
  };
  return [value, update];
}

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(Number(value) || 0) + " ₽";
}

function getCategoryLabel(categories, id) {
  return categories.find((item) => item.id === id)?.label || id;
}

function ShellIcon() {
  return (
    <div className="logo-icon">
      <span>◎</span>
    </div>
  );
}

function DishCard({ dish, lang }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="dish-card">
      <div className="dish-image-wrap">
        <img src={dish.image} alt={getDishName(dish, lang)} className="dish-image" />
        <div className="dish-gradient" />
        <div className="dish-weight">{dish.weight}</div>
        <div className="dish-title-row">
          <h3>{getDishName(dish, lang)}</h3>
          <div className="dish-price">{formatPrice(dish.price)}</div>
        </div>
      </div>

      <div className="dish-content">
        <p>{getDishNote(dish, lang)}</p>
        <button className="nutrition-toggle" onClick={() => setOpen(!open)}>
          <span>{lang === "en" ? "Nutrition per 100 g" : "КБЖУ на 100 г"}</span>
          <span className={open ? "chevron open" : "chevron"}>⌄</span>
        </button>

        {open && (
          <div className="nutrition-grid">
            <div><span>{lang === "en" ? "Kcal" : "Ккал"}</span><b>{dish.kcal}</b></div>
            <div><span>{lang === "en" ? "Protein" : "Белки"}</span><b>{dish.protein}</b></div>
            <div><span>{lang === "en" ? "Fat" : "Жиры"}</span><b>{dish.fat}</b></div>
            <div><span>{lang === "en" ? "Carbs" : "Углев."}</span><b>{dish.carbs}</b></div>
          </div>
        )}
      </div>
    </article>
  );
}

function MenuPage({ restaurants, categories, dishes, onOpenAdmin, lang, setLang }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [restaurant, setRestaurant] = useState(restaurants[0] || "");

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const restaurantMatch = dish.restaurant === restaurant;
      const categoryMatch = activeCategory === "all" || dish.category === activeCategory;
      return restaurantMatch && categoryMatch;
    });
  }, [dishes, restaurant, activeCategory]);

  return (
    <div className="site">
      <header className="hero">
        <div className="hero-bg" />
        <div className="container hero-inner">
          <div className="topbar">
            <div className="brand">
              <ShellIcon />
              <div className="brand-text">MOLLUSCA</div>
            </div>
            <div className="top-actions">
              <button className={lang === "ru" ? "lang-btn active" : "lang-btn"} onClick={() => setLang("ru")}>RU</button>
              <button className={lang === "en" ? "lang-btn active" : "lang-btn"} onClick={() => setLang("en")}>ENG</button>
              <button className="admin-link" onClick={onOpenAdmin}>Admin</button>
            </div>
          </div>

          <div className="restaurant-select-wrap">
            <div className="select-shell">
              <span className="pin">⌖</span>
              <select value={restaurant} onChange={(e) => setRestaurant(e.target.value)}>
                {restaurants.map((item) => <option key={item} value={item}>{getRestaurantName(item, lang)}</option>)}
              </select>
              <span className="select-arrow">⌄</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container main">
        <nav className="category-nav">
          {categories.map((category) => (
            <button
              key={category.id}
              className={activeCategory === category.id ? "category active" : "category"}
              onClick={() => setActiveCategory(category.id)}
            >
              {getCategoryName(category, lang)}
            </button>
          ))}
        </nav>

        <div className="dish-grid">
          {filteredDishes.map((dish) => <DishCard key={dish.id} dish={dish} lang={lang} />)}
        </div>

        {filteredDishes.length === 0 && (
          <div className="empty">{lang === "en" ? "No dishes in this category yet." : "В этой категории пока нет блюд."}</div>
        )}
      </main>
    </div>
  );
}

function LoginPage({ onLogin, onBack }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function submit(e) {
    e.preventDefault();
    if (login === "admin" && password === "1234") {
      onLogin();
    } else {
      alert("Неверный логин или пароль. Демо: admin / 1234");
    }
  }

  return (
    <div className="admin-page">
      <form className="login-card" onSubmit={submit}>
        <div className="brand login-brand">
          <ShellIcon />
          <div>
            <div className="brand-text">MOLLUSCA</div>
            <div className="muted">админ-панель</div>
          </div>
        </div>

        <input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Логин" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" type="password" />

        <button className="primary-btn">Войти</button>
        <p className="muted">Демо-доступ: admin / 1234</p>
        <button type="button" className="ghost-btn" onClick={onBack}>Вернуться к меню</button>
      </form>
    </div>
  );
}

const emptyDish = (restaurant, categories) => ({
  id: null,
  restaurant,
  name: "",
  nameEn: "",
  price: "",
  weight: "",
  category: categories.find((cat) => cat.id !== "all")?.id || "mussels",
  image: "",
  kcal: "",
  protein: "",
  fat: "",
  carbs: "",
  note: "",
  noteEn: "",
});

function AdminPage({
  restaurants,
  setRestaurants,
  categories,
  setCategories,
  dishes,
  setDishes,
  lang,
  onBack,
  onLogout,
}) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0] || "");
  const [dishForm, setDishForm] = useState(() => emptyDish(selectedRestaurant, categories));
  const [newRestaurant, setNewRestaurant] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryEn, setNewCategoryEn] = useState("");

  const restaurantDishes = dishes.filter((dish) => dish.restaurant === selectedRestaurant);

  function updateField(field, value) {
    setDishForm({ ...dishForm, [field]: value });
  }

  function resetDishForm() {
    setDishForm(emptyDish(selectedRestaurant, categories));
  }

  function saveDish(e) {
    e.preventDefault();

    const prepared = {
      ...dishForm,
      id: dishForm.id || uid(),
      restaurant: selectedRestaurant,
      price: Number(dishForm.price) || 0,
      kcal: Number(dishForm.kcal) || 0,
      protein: Number(dishForm.protein) || 0,
      fat: Number(dishForm.fat) || 0,
      carbs: Number(dishForm.carbs) || 0,
      image: dishForm.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    };

    if (dishForm.id) {
      setDishes(dishes.map((dish) => dish.id === dishForm.id ? prepared : dish));
    } else {
      setDishes([prepared, ...dishes]);
    }

    resetDishForm();
  }

  function editDish(dish) {
    setDishForm({ ...dish });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteDish(id) {
    if (confirm("Удалить карточку блюда?")) {
      setDishes(dishes.filter((dish) => dish.id !== id));
    }
  }

  function addRestaurant() {
    const value = newRestaurant.trim();
    if (!value) return;
    if (restaurants.includes(value)) return alert("Такой ресторан уже есть");
    setRestaurants([...restaurants, value]);
    setSelectedRestaurant(value);
    setNewRestaurant("");
  }

  function renameRestaurant(oldName, newName) {
    const clean = newName.trim();
    if (!clean || clean === oldName) return;
    if (restaurants.includes(clean)) return alert("Такой ресторан уже есть");

    setRestaurants(restaurants.map((item) => item === oldName ? clean : item));
    setDishes(dishes.map((dish) => dish.restaurant === oldName ? { ...dish, restaurant: clean } : dish));
    if (selectedRestaurant === oldName) setSelectedRestaurant(clean);
  }

  function deleteRestaurant(name) {
    if (restaurants.length <= 1) return alert("Нужен хотя бы один ресторан");
    if (confirm(`Удалить ресторан "${name}" и все его блюда?`)) {
      const nextRestaurants = restaurants.filter((item) => item !== name);
      setRestaurants(nextRestaurants);
      setDishes(dishes.filter((dish) => dish.restaurant !== name));
      setSelectedRestaurant(nextRestaurants[0]);
      resetDishForm();
    }
  }

  function addCategory() {
    const label = newCategory.trim();
    if (!label) return;
    const id = label.toLowerCase().replaceAll(" ", "-") + "-" + uid();
    setCategories([...categories, { id, label, labelEn: newCategoryEn.trim() || label }]);
    setNewCategory("");
    setNewCategoryEn("");
  }

  function renameCategory(id, field, value) {
    const clean = value.trim();
    if (!clean) return;
    setCategories(categories.map((cat) => cat.id === id ? { ...cat, [field]: clean } : cat));
  }

  function deleteCategory(id) {
    if (id === "all") return alert("Категорию «Всё» нельзя удалить");
    if (confirm("Удалить категорию? Блюда из неё останутся, но категория исчезнет.")) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-head">
          <div>
            <div className="admin-kicker">MOLLUSCA</div>
            <h1>Админ-панель</h1>
          </div>
          <div className="admin-actions">
            <button className="ghost-btn" onClick={onBack}>Открыть меню</button>
            <button className="primary-small" onClick={onLogout}>Выйти</button>
          </div>
        </div>

        <div className="admin-layout">
          <aside className="admin-sidebar">
            <section className="admin-card">
              <h2>Рестораны</h2>
              <div className="inline-form">
                <input value={newRestaurant} onChange={(e) => setNewRestaurant(e.target.value)} placeholder="Новый ресторан" />
                <button onClick={addRestaurant}>+</button>
              </div>

              <div className="list">
                {restaurants.map((item) => (
                  <div className="list-row" key={item}>
                    <input
                      value={item}
                      onChange={(e) => renameRestaurant(item, e.target.value)}
                      className={item === selectedRestaurant ? "selected-input" : ""}
                    />
                    <button onClick={() => setSelectedRestaurant(item)}>Выбрать</button>
                    <button className="danger" onClick={() => deleteRestaurant(item)}>×</button>
                  </div>
                ))}
              </div>
            </section>

            <section className="admin-card">
              <h2>Категории</h2>
              <div className="inline-form">
                <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Новая категория RU" />
                <input value={newCategoryEn} onChange={(e) => setNewCategoryEn(e.target.value)} placeholder="Category ENG" />
                <button onClick={addCategory}>+</button>
              </div>

              <div className="list">
                {categories.map((cat) => (
                  <div className="list-row" key={cat.id}>
                    <input value={cat.label} onChange={(e) => renameCategory(cat.id, "label", e.target.value)} disabled={cat.id === "all"} />
                    <input value={cat.labelEn || cat.label} onChange={(e) => renameCategory(cat.id, "labelEn", e.target.value)} disabled={cat.id === "all"} />
                    <button className="danger" onClick={() => deleteCategory(cat.id)}>×</button>
                  </div>
                ))}
              </div>
            </section>
          </aside>

          <section className="admin-card">
            <div className="section-head">
              <h2>Карточки блюд</h2>
              <select value={selectedRestaurant} onChange={(e) => {
                setSelectedRestaurant(e.target.value);
                setDishForm(emptyDish(e.target.value, categories));
              }}>
                {restaurants.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            <form className="dish-form" onSubmit={saveDish}>
              <input required value={dishForm.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Название блюда RU" />
              <input value={dishForm.nameEn || ""} onChange={(e) => updateField("nameEn", e.target.value)} placeholder="Dish name ENG" />
              <input value={dishForm.price} onChange={(e) => updateField("price", e.target.value)} placeholder="Цена" type="number" />
              <input value={dishForm.weight} onChange={(e) => updateField("weight", e.target.value)} placeholder="Вес / граммы" />

              <select value={dishForm.category} onChange={(e) => updateField("category", e.target.value)}>
                {categories.filter((category) => category.id !== "all").map((category) => (
                  <option key={category.id} value={category.id}>{getCategoryName(category, lang)}</option>
                ))}
              </select>

              <input value={dishForm.image} onChange={(e) => updateField("image", e.target.value)} placeholder="URL фото" />
              <input value={dishForm.kcal} onChange={(e) => updateField("kcal", e.target.value)} placeholder="Ккал" type="number" />
              <input value={dishForm.protein} onChange={(e) => updateField("protein", e.target.value)} placeholder="Белки" type="number" />
              <input value={dishForm.fat} onChange={(e) => updateField("fat", e.target.value)} placeholder="Жиры" type="number" />
              <input value={dishForm.carbs} onChange={(e) => updateField("carbs", e.target.value)} placeholder="Углеводы" type="number" />
              <textarea value={dishForm.note} onChange={(e) => updateField("note", e.target.value)} placeholder="Описание RU" />
              <textarea value={dishForm.noteEn || ""} onChange={(e) => updateField("noteEn", e.target.value)} placeholder="Description ENG" />

              <div className="form-actions">
                <button className="primary-btn">{dishForm.id ? "Сохранить изменения" : "Добавить блюдо"}</button>
                {dishForm.id && <button type="button" className="ghost-btn" onClick={resetDishForm}>Отмена</button>}
              </div>
            </form>

            <div className="admin-dish-list">
              {restaurantDishes.map((dish) => (
                <div className="admin-dish-row" key={dish.id}>
                  <img src={dish.image} alt={dish.name} />
                  <div>
                    <b>{dish.name}</b>
                    {dish.nameEn && <em>{dish.nameEn}</em>}
                    <span>{formatPrice(dish.price)} · {dish.weight} · {getCategoryLabel(categories, dish.category)}</span>
                  </div>
                  <div className="row-actions">
                    <button onClick={() => editDish(dish)}>Редактировать</button>
                    <button className="danger" onClick={() => deleteDish(dish.id)}>Удалить</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [view, setView] = useState("menu");
  const [lang, setLang] = useLocalStorageState("mollusca-lang", "ru");
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("mollusca-admin-auth") === "true");

  const [restaurants, setRestaurants] = useLocalStorageState("mollusca-restaurants", initialRestaurants);
  const [categories, setCategories] = useLocalStorageState("mollusca-categories", initialCategories);
  const [dishes, setDishes] = useLocalStorageState("mollusca-dishes", initialDishes);

  if (view === "login") {
    return (
      <LoginPage
        onBack={() => setView("menu")}
        onLogin={() => {
          localStorage.setItem("mollusca-admin-auth", "true");
          setIsLoggedIn(true);
          setView("admin");
        }}
      />
    );
  }

  if (view === "admin") {
    if (!isLoggedIn) return <LoginPage onBack={() => setView("menu")} onLogin={() => {
      localStorage.setItem("mollusca-admin-auth", "true");
      setIsLoggedIn(true);
    }} />;

    return (
      <AdminPage
        restaurants={restaurants}
        setRestaurants={setRestaurants}
        categories={categories}
        setCategories={setCategories}
        dishes={dishes}
        setDishes={setDishes}
        lang={lang}
        onBack={() => setView("menu")}
        onLogout={() => {
          localStorage.removeItem("mollusca-admin-auth");
          setIsLoggedIn(false);
          setView("menu");
        }}
      />
    );
  }

  return (
    <MenuPage
      restaurants={restaurants}
      categories={categories}
      dishes={dishes}
      onOpenAdmin={() => setView(isLoggedIn ? "admin" : "login")}
      lang={lang}
      setLang={setLang}
    />
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
