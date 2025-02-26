interface agreementItem {
  id: string;
  title: string;
  icon: any;
}

interface RuleProps {
  id: number;
  title: string;
  description: string;
  type: string;
  version: number;
  created_at: string;
  created_date: string;
  created_time: string;
}

interface GroupItemProps extends RuleProps {
  image: string;
}

interface dynamicAgreementProps {
  agreement_group: string;
}

export { agreementItem, RuleProps, GroupItemProps, dynamicAgreementProps };
