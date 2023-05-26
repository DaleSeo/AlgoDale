import type { IconType } from "react-icons";
import { FaQuestionCircle, FaTag, FaJava } from "react-icons/fa";
import { FiBook, FiClock } from "react-icons/fi";
import {
  SiDiscord,
  SiGithub,
  SiJavascript,
  SiLeetcode,
  SiMedium,
  SiPython,
  SiTwitter,
  SiYoutube,
} from "react-icons/si";
import { SlDirection } from "react-icons/sl";
import { CgListTree } from "react-icons/cg";
import { MdLoop } from "react-icons/md";

interface Props {
  name: string;
  size?: number | string;
  inline?: boolean;
}

const icons: Record<string, IconType> = {
  book: FiBook,
  clock: FiClock,
  direction: SlDirection,
  discord: SiDiscord,
  github: SiGithub,
  java: FaJava,
  javascript: SiJavascript,
  leetcode: SiLeetcode,
  loop: MdLoop,
  medium: SiMedium,
  python: SiPython,
  tree: CgListTree,
  tag: FaTag,
  twitter: SiTwitter,
  youtube: SiYoutube,
};

export default function Icon({ name, size = "1em", inline = false }: Props) {
  const Tag = name in icons ? icons[name] : FaQuestionCircle;
  return <Tag size={size} className={`${inline && "inline"}`} />;
}
