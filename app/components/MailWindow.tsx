interface MailWindowProps {
  onClose: () => void;
}

export default function MailWindow({ onClose }: MailWindowProps) {
  return (
    <div className="mail-compose">
      <div className="mail-field">
        <label>To:</label>
        <span>ruvaispuv@gmail.com</span>
      </div>
      <div className="mail-field">
        <label>Subject:</label>
        <input
          type="text"
          placeholder="Enter subject..."
          className="mail-input"
        />
      </div>
      <div className="mail-field mail-body-field">
        <textarea
          placeholder="Write your message here..."
          className="mail-textarea"
        />
      </div>
      <div className="mail-actions">
        <a href="mailto:ruvaispuv@gmail.com" className="mail-send-btn">
          ✉ Open in Mail App
        </a>
        <button className="mail-discard-btn" onClick={onClose}>
          Discard
        </button>
      </div>
    </div>
  );
}
