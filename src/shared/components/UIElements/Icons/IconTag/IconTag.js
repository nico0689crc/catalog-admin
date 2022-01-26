import * as iconsCategories from "../Categories";
import "./IconTag.css";

const IconTag = ({ iconName }) => {
  const TagIcon = iconsCategories[iconName];
  return (
    <span className="icon-tag">
      <TagIcon />
    </span>
  );
};

export default IconTag;
