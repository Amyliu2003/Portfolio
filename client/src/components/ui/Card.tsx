import React from "react";
import { cx } from "./cx";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

const CardRoot: React.FC<DivProps> = ({ className, ...props }) => (
  <div className={cx("ui-card", className)} {...props} />
);

const CardHd: React.FC<DivProps> = ({ className, ...props }) => (
  <div className={cx("ui-card__hd", className)} {...props} />
);

const CardBd: React.FC<DivProps> = ({ className, ...props }) => (
  <div className={cx("ui-card__bd", className)} {...props} />
);

/** Design system E — `<Card><Card.Hd/><Card.Bd/></Card>`, radius 16. */
export const Card = Object.assign(CardRoot, { Hd: CardHd, Bd: CardBd });
