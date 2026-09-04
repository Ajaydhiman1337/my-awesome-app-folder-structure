export type ModalProps = {
  title: string;
  content: string;
  isOpen?: boolean;
};

export function Modal(props: ModalProps) {
  return {
    title: props.title,
    content: props.content,
    isOpen: props.isOpen ?? true,
    className: props.isOpen === false ? "modal modal--closed" : "modal modal--open",
  };
}

export function renderModal(props: ModalProps): string {
  const modal = Modal(props);

  if (!modal.isOpen) {
    return "";
  }

  return `
    <div class="${modal.className}">
      <h2>${modal.title}</h2>
      <p>${modal.content}</p>
    </div>
  `;
}

export default Modal;

