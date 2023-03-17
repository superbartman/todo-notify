'use strict';
(self.webpackChunkReactChromeExtensions =
  self.webpackChunkReactChromeExtensions || []).push([
  [812],
  {
    84812: (e, t, s) => {
      s.r(t), s.d(t, { default: () => l });
      var a = s(93106),
        i = s(16306);
      const l = () => {
        const [e, t] = a.useState([]),
          [s, l] = a.useState([]);
        a.useEffect(() => {
          chrome.storage.local.get('notiList').then((e) => {
            var t;
            const s = null !== (t = e.notiList) && void 0 !== t ? t : [];
            l(s);
          }),
            chrome.runtime.onMessage.addListener((e) => {
              'update noti task' === e.message && e.list && l(e.list);
            });
        }, []);
        const n = [
          {
            title: 'Title',
            dataIndex: 'title',
            formItemProps: { rules: [{ required: !0 }] },
          },
          {
            title: 'Desc',
            dataIndex: 'desc',
            formItemProps: { rules: [{ required: !0 }] },
          },
          {
            title: 'Status',
            dataIndex: 'status',
            valueType: 'switch',
            formItemProps: { rules: [{ required: !0 }] },
          },
          {
            title: 'Noti Time',
            dataIndex: 'noti_time',
            valueType: 'dateTime',
            formItemProps: { rules: [{ required: !0 }] },
          },
          {
            title: 'Action',
            valueType: 'option',
            render: (e, t, i, n) => [
              a.createElement(
                'a',
                {
                  key: 'editable',
                  onClick: () => {
                    var e;
                    null === (e = null == n ? void 0 : n.startEditable) ||
                      void 0 === e ||
                      e.call(n, t.id);
                  },
                },
                'Edit',
              ),
              a.createElement(
                'a',
                {
                  key: 'delete',
                  onClick: () => {
                    const e = s.filter((e) => e.id !== t.id);
                    chrome.storage.local.set({ notiList: e }).then(() => {
                      l(e),
                        !e.length &&
                          chrome.runtime.sendMessage({
                            message: 'stop noti task',
                          });
                    });
                  },
                },
                'Delete',
              ),
            ],
          },
        ];
        return a.createElement(
          a.Fragment,
          null,
          a.createElement(i.Z, {
            rowKey: 'id',
            columns: n,
            value: s,
            onChange: (e) => {
              chrome.storage.local.set({ notiList: e }).then(() => {
                l(e);
              });
            },
            editable: {
              type: 'multiple',
              editableKeys: e,
              saveText: 'Save',
              deleteText: 'Delete',
              cancelText: 'Cancel',
              onSave: () =>
                new Promise((e) => {
                  e(!0);
                }),
              onChange: t,
            },
            recordCreatorProps: {
              record: () => ({
                id: new Date().getTime(),
                title: '',
                desc: '',
                status: !0,
                noti_time: new Date().getTime(),
              }),
            },
          }),
        );
      };
    },
  },
]);
