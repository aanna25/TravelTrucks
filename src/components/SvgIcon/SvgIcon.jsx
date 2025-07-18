const SvgIcon = ({ iconId, className = "", ...props }) => {
  if (!iconId) {
    return null;
  }

  return (
    <svg className={className} width="24" height="24" {...props}>
      <use href={`/icons.svg#${iconId}`}></use>
    </svg>
  );
};

export default SvgIcon;
