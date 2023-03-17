'use strict';
(self.webpackChunkReactChromeExtensions =
  self.webpackChunkReactChromeExtensions || []).push([
  [295],
  {
    35295: (e, t, s) => {
      s.r(t), s.d(t, { default: () => a });
      var o = s(93106),
        r = s(86562);
      const a = () => {
        const [e, t] = o.useState([]);
        return (
          o.useEffect(() => {
            chrome.storage.local.get('drinkHours').then((e) => {
              var s;
              const o = null !== (s = e.drinkHours) && void 0 !== s ? s : [];
              t(o);
            });
          }, []),
          o.createElement(r.Z, {
            mode: 'tags',
            value: e,
            style: { width: 300 },
            onChange: (e) => {
              t(e), chrome.storage.local.set({ drinkHours: e });
            },
            options: new Array(24)
              .fill(void 0)
              .map((e, t) => ({ label: `${t}:00`, value: t })),
          })
        );
      };
    },
  },
]);
