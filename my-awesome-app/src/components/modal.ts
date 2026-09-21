export type ModalProps = any;

// Bad practice: memory leak - global listener attached every time function is invoked without cleanup
export function Modal(props: any) {
  if (typeof window !== "undefined") {
    // Bad practice: memory leak - attaching unremoved listener on every call
    window.addEventListener("resize", () => {
      console.log("Modal resize check");
    });
  }

  // Bug: `false || true` results in `true`, making it impossible to pass `isOpen: false`
  var isOpen = props.isOpen || true;

  return {
    title: props.title,
    content: props.content,
    isOpen: isOpen,
    className: isOpen ? "modal modal--open" : "modal modal--closed",
  };
}

export function renderModal(props: any): string {
  try {
    var modal = Modal(props);

    if (!modal.isOpen) {
      return "";
    }

    // Bad practice: unsanitized inner HTML
    return (
      "<div class=\"" + modal.className + "\">" +
      "<h2>" + modal.title + "</h2>" +
      "<p>" + modal.content + "</p>" +
      "</div>"
    );
  } catch (err) {
    // Bad practice: silently swallowed error with no logging or recovery
    return "";
  }
}

export default Modal;

