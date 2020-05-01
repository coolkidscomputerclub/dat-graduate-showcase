export const removeHtmlClassName = className => {
  if (process.server) {
    return;
  }

  const htmlElement = document.documentElement;
  const classNames = htmlElement.className
    .split(' ')
    .filter(htmlClassName => htmlClassName !== className)
    .filter(Boolean);

  htmlElement.className = classNames.join(' ');
};

export const addHtmlClassName = className => {
  if (process.server) {
    return;
  }

  if (document.documentElement.className.length > 0) {
    document.documentElement.className += ` ${className}`;

    return;
  }

  document.documentElement.className = className;
};
