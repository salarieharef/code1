import BankAnsarIcon from "@/static/icons/banks/ansar.svg?url";
import BankAyandeIcon from "@/static/icons/banks/ayande.svg?url";
import BankDayIcon from "@/static/icons/banks/day.svg?url";
import BankEghtesadIcon from "@/static/icons/banks/eghtesad.svg?url";
import BankGhavaminIcon from "@/static/icons/banks/ghavamin.svg?url";
import BankHekmatIcon from "@/static/icons/banks/hekmat.svg?url";
import BankKarafarinIcon from "@/static/icons/banks/karafarin.svg?url";
import BankKeshavarziIcon from "@/static/icons/banks/keshavarzi.svg?url";
import BankMaskanIcon from "@/static/icons/banks/maskan.svg?url";
import BankMehrIcon from "@/static/icons/banks/mehriran.svg?url";
import BankMellatIcon from "@/static/icons/banks/mellat.svg?url";
import BankMelliIcon from "@/static/icons/banks/melli.svg?url";
import BankPasargadIcon from "@/static/icons/banks/pasargad.svg?url";
import BankPostIcon from "@/static/icons/banks/post.svg?url";
import BankRefahIcon from "@/static/icons/banks/refah.svg?url";
import BankSaderatIcon from "@/static/icons/banks/saderat.svg?url";
import BankSamanIcon from "@/static/icons/banks/saman.svg?url";
import BankSanatMadanIcon from "@/static/icons/banks/sanatmadan.svg?url";
import BankSarmayeIcon from "@/static/icons/banks/sarmaye.svg?url";
import BankSepahIcon from "@/static/icons/banks/sepah.svg?url";
import BankShahrIcon from "@/static/icons/banks/shahr.svg?url";
import BankSinaIcon from "@/static/icons/banks/sina.svg?url";
import BankTejaratIcon from "@/static/icons/banks/tejarat.svg?url";
import BankToseIcon from "@/static/icons/banks/tose.svg?url";
import BankToseSaderatIcon from "@/static/icons/banks/tosesaderat.svg?url";

export const banksData: BanksData = [
  {
    id: 1,
    name: "اداره معاملات ریالی بانک مرکزی",
    // icon: BankCentralIcon,
    cardPrefixes: ["636795"],
    ibanCode: "010",
  },
  {
    id: 2,
    name: "بانک صنعت و معدن",
    icon: BankSanatMadanIcon,
    cardPrefixes: ["627961"],
    ibanCode: "011",
  },
  {
    id: 3,
    name: "بانک ملت",
    icon: BankMellatIcon,
    cardPrefixes: ["610433"],
    ibanCode: "012",
  },
  {
    id: 4,
    name: "بانک رفاه کارگران",
    icon: BankRefahIcon,
    cardPrefixes: ["589463"],
    ibanCode: "013",
  },
  {
    id: 5,
    name: "بانک مسکن",
    icon: BankMaskanIcon,
    cardPrefixes: ["628023"],
    ibanCode: "014",
  },
  {
    id: 6,
    name: "بانک سپه",
    icon: BankSepahIcon,
    cardPrefixes: ["589210"],
    ibanCode: "015",
  },
  {
    id: 7,
    name: "بانک کشاورزی",
    icon: BankKeshavarziIcon,
    cardPrefixes: ["603770"],
    ibanCode: "016",
  },
  {
    id: 8,
    name: "بانک ملی ایران",
    icon: BankMelliIcon,
    cardPrefixes: ["603799"],
    ibanCode: "017",
  },
  {
    id: 9,
    name: "بانک تجارت",
    icon: BankTejaratIcon,
    cardPrefixes: ["627353", "585983"],
    ibanCode: "018",
  },
  {
    id: 10,
    name: "بانک صادرات ایران",
    icon: BankSaderatIcon,
    cardPrefixes: ["603769"],
    ibanCode: "019",
  },
  {
    id: 11,
    name: "بانک توسعه صادرات ایران",
    icon: BankToseSaderatIcon,
    cardPrefixes: ["627648"],
    ibanCode: "020",
  },
  {
    id: 12,
    name: "پست بانک",
    icon: BankPostIcon,
    cardPrefixes: ["627760"],
    ibanCode: "021",
  },
  {
    id: 13,
    name: "بانک توسعه تعاون",
    // icon: BankToseTaavonIcon,
    cardPrefixes: ["502908"],
    ibanCode: "022",
  },
  {
    id: 14,
    name: "موسسه اعتباری توسعه",
    icon: BankToseIcon,
    cardPrefixes: ["628157"],
    ibanCode: "023",
  },
  {
    id: 15,
    name: "بانک کارآفرین",
    icon: BankKarafarinIcon,
    cardPrefixes: ["627488"],
    ibanCode: "024",
  },
  {
    id: 16,
    name: "بانک پارسیان",
    // icon: BankParsianIcon,
    cardPrefixes: ["622106"],
    ibanCode: "025",
  },
  {
    id: 17,
    name: "بانک اقتصاد نوین",
    icon: BankEghtesadIcon,
    cardPrefixes: ["627412"],
    ibanCode: "026",
  },
  {
    id: 18,
    name: "بانک سامان",
    icon: BankSamanIcon,
    cardPrefixes: ["621986"],
    ibanCode: "027",
  },
  {
    id: 19,
    name: "بانک پاسارگاد",
    icon: BankPasargadIcon,
    cardPrefixes: ["502229"],
    ibanCode: "028",
  },
  {
    id: 20,
    name: "بانک سرمایه",
    icon: BankSarmayeIcon,
    cardPrefixes: ["639607"],
    ibanCode: "029",
  },
  {
    id: 21,
    name: "بانک سینا",
    icon: BankSinaIcon,
    cardPrefixes: ["639346"],
    ibanCode: "030",
  },
  {
    id: 22,
    name: "بانک قرض‌الحسنه مهر ایران",
    icon: BankMehrIcon,
    cardPrefixes: ["606373"],
    ibanCode: "031",
  },
  {
    id: 23,
    name: "بانک شهر",
    icon: BankShahrIcon,
    cardPrefixes: ["504706"],
    ibanCode: "032",
  },
  {
    id: 24,
    name: "بانک آینده",
    icon: BankAyandeIcon,
    cardPrefixes: ["636214"],
    ibanCode: "033",
  },
  {
    id: 25,
    name: "بانک انصار",
    icon: BankAnsarIcon,
    cardPrefixes: ["627381"],
    ibanCode: "034",
  },
  {
    id: 26,
    name: "بانک گردشگری",
    // icon: BankGardeshgariIcon,
    cardPrefixes: ["505416"],
    ibanCode: "035",
  },
  {
    id: 27,
    name: "بانک حکمت ایرانیان",
    icon: BankHekmatIcon,
    cardPrefixes: ["636949"],
    ibanCode: "036",
  },
  {
    id: 28,
    name: "بانک دی",
    icon: BankDayIcon,
    cardPrefixes: ["502938"],
    ibanCode: "037",
  },
  {
    id: 29,
    name: "بانک ایران زمین",
    // icon: BankIranZaminIcon,
    cardPrefixes: ["505785"],
    ibanCode: "038",
  },
  {
    id: 30,
    name: "بانک قرض‌الحسنه رسالت",
    // icon: BankResalatIcon,
    cardPrefixes: ["504172"],
    ibanCode: "039",
  },
  {
    id: 31,
    name: "بانک خاورمیانه",
    // icon: BankMiddleEastIcon,
    cardPrefixes: ["505809", "585947"],
    ibanCode: "040",
  },
  {
    id: 32,
    name: "بانک قوامین",
    icon: BankGhavaminIcon,
    cardPrefixes: ["639599"],
    ibanCode: "041",
  },
  {
    id: 33,
    name: "موسسه مالی و اعتباری کوثر",
    // icon: BankKosarIcon,
    cardPrefixes: ["505801"],
    ibanCode: "042",
  },
  {
    id: 34,
    name: "موسسه مالی و اعتباری عسگریه",
    // icon: BankAsgariyeIcon,
    cardPrefixes: ["606256"],
    ibanCode: "043",
  },
  {
    id: 35,
    name: "بانک ایران ونزوئلا",
    // icon: BankIranVenezuelaIcon,
    cardPrefixes: ["581874"],
    ibanCode: "044",
  },
  {
    id: 36,
    name: "موسسه نور",
    // icon: BankNoorIcon,
    cardPrefixes: ["507677"],
    ibanCode: "045",
  },
];
