import PodcastClient from "./PodcastClient";
import { getPodcasts } from "@/lib/cms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast | One True Academia",
  description: "Descubre el maravilloso mundo de la evaluación forense de la credibilidad y la detección de mentiras.",
};

export default async function PodcastPage() {
  const podcasts = await getPodcasts();
  const publishedPodcasts = podcasts.filter((p: any) => p.published);
  return <PodcastClient initialEpisodes={publishedPodcasts} />;
}
