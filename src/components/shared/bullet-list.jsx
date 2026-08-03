const BulletList = ({ items }) => (
  <ul className="space-y-2.5">
    {items.map((item, i) => (
      <li
        key={i}
        className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
      >
        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
        {item}
      </li>
    ))}
  </ul>
);

export default BulletList;
