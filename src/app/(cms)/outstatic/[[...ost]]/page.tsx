import "outstatic/outstatic.css";
import { Outstatic } from "outstatic";
import { OstClient } from "outstatic/client";

type OutstaticPageProps = {
  params: Promise<{ ost?: string[] }>;
};

export default async function OutstaticPage({ params }: OutstaticPageProps) {
  const ostData = await Outstatic();
  const { ost = [] } = await params;

  return <OstClient ostData={ostData} params={{ ost }} />;
}
