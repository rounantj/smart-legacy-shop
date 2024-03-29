import Image from "next/image";

import { ReceitaCategory } from "@models/ReceitaCategory";

import receitaCategoryCardStyle from "@styles/components/receitas/receitaCategoryCardStyle.module.css";

interface StaticPropsResult {
  category: ReceitaCategory;
	count: Number;
}

export default function ReceitaCategoryCard(props: StaticPropsResult) {
  return (
    <div className={receitaCategoryCardStyle.productCard}>


    </div>
  );
}
