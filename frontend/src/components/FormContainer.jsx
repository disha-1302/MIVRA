const DEFAULT_NOTES = ['Sign in securely', 'Confirm your address', 'Pay with Razorpay'];

const FormContainer = ({
  kicker = 'Secure checkout',
  title = 'Three steps to your door.',
  lede = 'Sign in, confirm where it should go, and pay securely. You can follow every order from your account.',
  notes = DEFAULT_NOTES,
  index = '01',
  children,
}) => (
  <div className="auth-shell">
    <aside className="auth-aside">
      <div>
        <p className="eyebrow">{kicker}</p>
        <h2>{title}</h2>
        <p>{lede}</p>
      </div>
      <ul className="auth-notes">
        {notes.map((note) => <li key={note}>{note}</li>)}
      </ul>
      <span className="aside-index" aria-hidden="true">{index}</span>
    </aside>
    <div className="auth-panel">{children}</div>
  </div>
);

export default FormContainer;
