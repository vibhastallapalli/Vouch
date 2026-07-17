/* @ds-bundle: {"format":4,"namespace":"NotaryDeskDesignSystem_b90341","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"WalletChip","sourcePath":"components/actions/WalletChip.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"LedgerSplit","sourcePath":"components/proof/LedgerSplit.jsx"},{"name":"Seal","sourcePath":"components/proof/Seal.jsx"},{"name":"SequenceNav","sourcePath":"components/proof/SequenceNav.jsx"},{"name":"Status","sourcePath":"components/proof/Status.jsx"},{"name":"Landing","sourcePath":"ui_kits/app/Landing.jsx"},{"name":"PrivateAction","sourcePath":"ui_kits/app/PrivateAction.jsx"},{"name":"ProofInFlight","sourcePath":"ui_kits/app/ProofInFlight.jsx"},{"name":"Receipt","sourcePath":"ui_kits/app/Receipt.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"4fda15f6a5fc","components/actions/WalletChip.jsx":"b80899c546e5","components/forms/Input.jsx":"2814723765e1","components/proof/LedgerSplit.jsx":"fc4caaaf8855","components/proof/Seal.jsx":"c320225d5790","components/proof/SequenceNav.jsx":"1f5e826db94d","components/proof/Status.jsx":"56405d4418fd","ui_kits/app/Landing.jsx":"c643174b9731","ui_kits/app/PrivateAction.jsx":"b2af08092937","ui_kits/app/ProofInFlight.jsx":"814dc6824c3e","ui_kits/app/Receipt.jsx":"bd48bc045f09"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NotaryDeskDesignSystem_b90341 = window.NotaryDeskDesignSystem_b90341 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  variant = 'primary',
  size = 'md',
  children,
  ...rest
}) {
  const cls = ['mn-btn', 'mn-btn--' + variant, size === 'lg' ? 'mn-btn--lg' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/WalletChip.jsx
try { (() => {
function WalletChip({
  connected = false,
  address = 'addr1···x7q9',
  onClick
}) {
  if (connected) return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mn-chip mn-chip--on",
    onClick: onClick,
    title: "Lace wallet connected"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mn-chip__mark"
  }, "Lace"), /*#__PURE__*/React.createElement("span", null, address));
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mn-chip mn-chip--off",
    onClick: onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "mn-chip__mark"
  }, "Lace"), /*#__PURE__*/React.createElement("span", null, "Connect wallet"));
}
Object.assign(__ds_scope, { WalletChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/WalletChip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  note,
  privacy,
  id,
  ...rest
}) {
  const iid = id || React.useId();
  return /*#__PURE__*/React.createElement("div", {
    className: 'mn-field' + (privacy === 'private' ? ' mn-field--private' : '')
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "mn-label",
    htmlFor: iid
  }, label, privacy === 'private' && /*#__PURE__*/React.createElement("span", {
    className: "mn-tag-private"
  }, "Private")), /*#__PURE__*/React.createElement("input", _extends({
    id: iid,
    className: "mn-input"
  }, rest)), note && /*#__PURE__*/React.createElement("p", {
    className: "mn-field__note"
  }, note));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/proof/LedgerSplit.jsx
try { (() => {
function Rows({
  rows
}) {
  return /*#__PURE__*/React.createElement("div", null, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    className: "mn-ledger__row",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "mn-ledger__label"
  }, r.label), /*#__PURE__*/React.createElement("span", {
    className: 'mn-ledger__value' + (r.mono ? ' mn-ledger__value--mono' : '')
  }, r.value))));
}
function LedgerSplit({
  publicTitle = 'Public · on the chain',
  privateTitle = 'Private · never left this device',
  publicRows = [],
  privateRows = [],
  publicNote,
  privateNote,
  seal = null
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "mn-ledger"
  }, /*#__PURE__*/React.createElement("section", {
    className: "mn-ledger__col mn-ledger__col--public"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "mn-ledger__head"
  }, publicTitle), /*#__PURE__*/React.createElement(Rows, {
    rows: publicRows
  }), publicNote && /*#__PURE__*/React.createElement("p", {
    className: "mn-ledger__note"
  }, publicNote), seal && /*#__PURE__*/React.createElement("div", {
    className: "mn-ledger__seal"
  }, seal)), /*#__PURE__*/React.createElement("div", {
    className: "mn-ledger__perf",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("section", {
    className: "mn-ledger__col mn-ledger__col--private"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "mn-ledger__head"
  }, privateTitle), /*#__PURE__*/React.createElement(Rows, {
    rows: privateRows
  }), privateNote && /*#__PURE__*/React.createElement("p", {
    className: "mn-ledger__note"
  }, privateNote)));
}
Object.assign(__ds_scope, { LedgerSplit });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/proof/LedgerSplit.jsx", error: String((e && e.message) || e) }); }

// components/proof/Seal.jsx
try { (() => {
function Seal({
  mode = 'stamped',
  size = 160,
  ring = 'PRODUCT NAME · PROOF NOTARIZED · ',
  center = 'RECORDED',
  duration = 6
}) {
  const id = React.useId();
  return /*#__PURE__*/React.createElement("span", {
    className: 'mn-seal mn-seal--' + mode,
    style: {
      width: size,
      height: size,
      '--seal-dur': duration + 's'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    width: size,
    height: size,
    role: "img",
    "aria-label": 'Seal: ' + center
  }, /*#__PURE__*/React.createElement("circle", {
    className: "mn-seal__outer",
    cx: "60",
    cy: "60",
    r: "56",
    fill: "none",
    strokeWidth: "2.5",
    pathLength: "100"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "mn-seal__inner",
    cx: "60",
    cy: "60",
    r: "36",
    fill: "none",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("path", {
    id: id,
    d: "M 60 15 a 45 45 0 1 1 -0.01 0",
    fill: "none"
  }), /*#__PURE__*/React.createElement("text", {
    className: "mn-seal__ring",
    fontSize: "8.5",
    letterSpacing: "2.4"
  }, /*#__PURE__*/React.createElement("textPath", {
    href: '#' + id
  }, ring)), /*#__PURE__*/React.createElement("text", {
    className: "mn-seal__center",
    x: "60",
    y: "63.5",
    textAnchor: "middle",
    fontSize: "10",
    letterSpacing: "1.2"
  }, center)));
}
Object.assign(__ds_scope, { Seal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/proof/Seal.jsx", error: String((e && e.message) || e) }); }

// components/proof/SequenceNav.jsx
try { (() => {
function SequenceNav({
  steps = ['Commit', 'Prove', 'Verify'],
  current = 0
}) {
  return /*#__PURE__*/React.createElement("ol", {
    className: "mn-seq"
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: s,
    className: 'mn-seq__item' + (i === current ? ' mn-seq__item--current' : i < current ? ' mn-seq__item--done' : '')
  }, /*#__PURE__*/React.createElement("span", {
    className: "mn-seq__num"
  }, '0' + (i + 1)), /*#__PURE__*/React.createElement("span", null, s))));
}
Object.assign(__ds_scope, { SequenceNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/proof/SequenceNav.jsx", error: String((e && e.message) || e) }); }

// components/proof/Status.jsx
try { (() => {
function Status({
  kind = 'recorded',
  children
}) {
  const fallback = {
    recorded: 'Recorded',
    pending: 'Pending',
    void: 'Void'
  };
  return /*#__PURE__*/React.createElement("span", {
    className: 'mn-status mn-status--' + kind
  }, children || fallback[kind]);
}
Object.assign(__ds_scope, { Status });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/proof/Status.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Landing.jsx
try { (() => {
function Landing({
  onBegin,
  connected,
  onToggleWallet
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "k-screen",
    "data-screen-label": "Landing"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-doc"
  }, /*#__PURE__*/React.createElement("header", {
    className: "k-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mn-label"
  }, "Runs on Midnight"), /*#__PURE__*/React.createElement(__ds_scope.WalletChip, {
    connected: connected,
    onClick: onToggleWallet
  })), /*#__PURE__*/React.createElement("main", {
    className: "k-landing"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-landing__copy"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "k-h1"
  }, "Product name"), /*#__PURE__*/React.createElement("p", {
    className: "k-lede"
  }, "One sentence stating what this app proves without revealing the secret behind it."), /*#__PURE__*/React.createElement(__ds_scope.SequenceNav, {
    current: -1
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg",
    onClick: onBegin
  }, "Commit your secret")), /*#__PURE__*/React.createElement("div", {
    className: "k-landing__seal"
  }, /*#__PURE__*/React.createElement(__ds_scope.Seal, {
    mode: "embossed",
    size: 260,
    center: "UNSTAMPED"
  }))), /*#__PURE__*/React.createElement("footer", {
    className: "k-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k-foot__note"
  }, "Proofs are verified on chain. Secrets stay on this device."))));
}
Object.assign(__ds_scope, { Landing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Landing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/PrivateAction.jsx
try { (() => {
function PrivateAction({
  onCommit,
  onBack,
  connected,
  onToggleWallet
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "k-screen",
    "data-screen-label": "Private action"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-doc k-doc--commit"
  }, /*#__PURE__*/React.createElement("header", {
    className: "k-top"
  }, /*#__PURE__*/React.createElement(__ds_scope.SequenceNav, {
    current: 0
  }), /*#__PURE__*/React.createElement(__ds_scope.WalletChip, {
    connected: connected,
    onClick: onToggleWallet
  })), /*#__PURE__*/React.createElement("main", {
    className: "k-commit"
  }, /*#__PURE__*/React.createElement("section", {
    className: "k-private-panel"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mn-label"
  }, "Private \xB7 stays on this device"), /*#__PURE__*/React.createElement("h2", {
    className: "k-h2 k-h2--ondark"
  }, "Secret input title"), /*#__PURE__*/React.createElement(__ds_scope.Input, {
    label: "Secret value",
    privacy: "private",
    placeholder: "Enter the secret thing",
    note: "Held in memory on this device. Committing does not send it anywhere."
  })), /*#__PURE__*/React.createElement("aside", {
    className: "k-boundary"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mn-label",
    style: {
      color: 'var(--seal)'
    }
  }, "What leaves this device"), /*#__PURE__*/React.createElement("p", null, "A commitment: a fingerprint of your secret that reveals nothing about it."), /*#__PURE__*/React.createElement("span", {
    className: "mn-label"
  }, "What stays"), /*#__PURE__*/React.createElement("p", null, "The secret value itself."), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    onClick: onCommit
  }, "Commit"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    onClick: onBack
  }, "Back")))));
}
Object.assign(__ds_scope, { PrivateAction });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/PrivateAction.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ProofInFlight.jsx
try { (() => {
const STAGES = ['Reading commitment', 'Building circuit', 'Generating proof', 'Posting to chain'];
function ProofInFlight({
  onDone,
  autoAdvance = true
}) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    const i = setInterval(() => setT(x => Math.round((x + 0.1) * 10) / 10), 100);
    return () => clearInterval(i);
  }, []);
  React.useEffect(() => {
    if (autoAdvance && t >= 7.6 && onDone) onDone();
  }, [t, onDone, autoAdvance]);
  const stage = Math.min(3, Math.floor(t / 1.9));
  return /*#__PURE__*/React.createElement("div", {
    className: "k-screen",
    "data-screen-label": "Proof in flight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-doc k-doc--flight"
  }, /*#__PURE__*/React.createElement("header", {
    className: "k-top"
  }, /*#__PURE__*/React.createElement(__ds_scope.SequenceNav, {
    current: 1
  }), /*#__PURE__*/React.createElement("span", {
    className: "k-elapsed"
  }, t.toFixed(1), "s")), /*#__PURE__*/React.createElement("main", {
    className: "k-flight"
  }, /*#__PURE__*/React.createElement(__ds_scope.Seal, {
    mode: "drawing",
    size: 230,
    center: "IN PROGRESS",
    duration: 7.5
  }), /*#__PURE__*/React.createElement("ol", {
    className: "k-witness"
  }, STAGES.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: s,
    className: i <= stage ? 'is-on' : ''
  }, /*#__PURE__*/React.createElement("span", {
    className: "k-witness__num"
  }, '0' + (i + 1)), s, i < stage ? ' · done' : i === stage ? ' …' : ''))), /*#__PURE__*/React.createElement("p", {
    className: "k-flight__note"
  }, "Proof generation takes a few seconds by design. Nothing about your secret is being sent."))));
}
Object.assign(__ds_scope, { ProofInFlight });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ProofInFlight.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Receipt.jsx
try { (() => {
function Receipt({
  onRestart,
  connected,
  onToggleWallet
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "k-screen",
    "data-screen-label": "Receipt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k-doc"
  }, /*#__PURE__*/React.createElement("header", {
    className: "k-top"
  }, /*#__PURE__*/React.createElement(__ds_scope.SequenceNav, {
    current: 2
  }), /*#__PURE__*/React.createElement(__ds_scope.WalletChip, {
    connected: connected,
    onClick: onToggleWallet
  })), /*#__PURE__*/React.createElement("main", {
    className: "k-receipt"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "k-h2"
  }, "Receipt"), /*#__PURE__*/React.createElement(__ds_scope.LedgerSplit, {
    publicRows: [{
      label: 'Proof status',
      value: /*#__PURE__*/React.createElement(__ds_scope.Status, {
        kind: "recorded"
      })
    }, {
      label: 'Commitment',
      value: 'Commitment hash',
      mono: true
    }, {
      label: 'Amount staked',
      value: 'Token amount',
      mono: true
    }, {
      label: 'Recorded at',
      value: 'Block reference',
      mono: true
    }],
    privateRows: [{
      label: 'Secret value',
      value: 'Never shown on chain'
    }, {
      label: 'Question answered',
      value: 'Question title'
    }, {
      label: 'Where it lives',
      value: 'This device'
    }],
    publicNote: "Anyone can verify this proof. It reveals only that the claim is true.",
    privateNote: "Kept by you. The chain never saw it.",
    seal: /*#__PURE__*/React.createElement(__ds_scope.Seal, {
      mode: "stamped",
      size: 140,
      center: "RECORDED"
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "k-receipt__actions"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    onClick: onRestart
  }, "Start over")))));
}
Object.assign(__ds_scope, { Receipt });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Receipt.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.WalletChip = __ds_scope.WalletChip;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.LedgerSplit = __ds_scope.LedgerSplit;

__ds_ns.Seal = __ds_scope.Seal;

__ds_ns.SequenceNav = __ds_scope.SequenceNav;

__ds_ns.Status = __ds_scope.Status;

__ds_ns.Landing = __ds_scope.Landing;

__ds_ns.PrivateAction = __ds_scope.PrivateAction;

__ds_ns.ProofInFlight = __ds_scope.ProofInFlight;

__ds_ns.Receipt = __ds_scope.Receipt;

})();
