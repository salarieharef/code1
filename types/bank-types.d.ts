type Bank = {
  id: number;
  name: string;
  icon?: any;
  cardPrefixes: string[];
  ibanCode: string;
};

type BanksData = Bank[];
