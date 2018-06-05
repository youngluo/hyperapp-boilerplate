import { app, h } from 'hyperapp';
import hc from 'hc-tips';
import '../node_modules/hc-tips/dist/style.css';
import './index.less';

app(
  null,
  null,
  () => (
    <div class="hc-container">
      <h1>hc-tips</h1>
      <p>A tips component based on hyperapp.js and WeUI</p>
      <button onclick={() => hc.toast('toast')}>toast</button>
      <button onclick={() => hc.toast({ content: 'error toast', type: 'error' })}>error toast</button>
      <button
        onclick={() => {
          const close = hc.loading();
          setTimeout(close, 2000);
        }}
      >
        loading
      </button>
      <button
        onclick={() => hc.alert('alert content')}
      >
        alert
      </button>
      <button
        onclick={() =>
          hc.confirm({
            title: 'confirm title',
            content: 'confirm content',
          })
        }
      >
        confirm
      </button>
    </div>
  ),
  document.getElementById('app'),
);
