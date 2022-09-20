<script setup>
import PageContributor from './PageContributor.vue';
import { CONTRIBUTORS_MAP } from './PageContributorConfig';
import { computed } from 'vue';

function unique(arr) {
  let map = new Map();
  let array = new Array();
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i].homepage)) {
      map.set(arr[i].homepage, true);
    } else {
      map.set(arr[i].homepage, false);
      array.push(arr[i]);
    }
  }
  return array;
}

const contributors = computed(() => {
  return unique(Object.values(CONTRIBUTORS_MAP).flat());
});

</script>

<template>
  <div class="container-contributors">
    <div class="contributors-inner">
      <h2>✨贡献者✨</h2>
      <PageContributor
        v-if="contributors && contributors.length > 0"
        :contributors="contributors"
        :spacing="20"
        :avatarSize="48"
      />
      <a href="/contributing/">
        <Button class="btn-become-contributor" variant="solid" color="primary">成为贡献者</Button>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// iPad/PC
.container-contributors {
  padding: 2rem 0;
  background: var(--devui-global-bg, #f3f6f8);

  .contributors-inner {
    max-width: 564px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h2 {
      margin-top: 1rem;
      margin-bottom: 2rem;
      text-align: center;
      font-size: 2rem;
      border: 0;
    }

    img {
      max-width: unset;
    }

    a:hover {
      text-decoration: none;
    }

    .btn-become-contributor {
      margin-top: 1rem;
    }

    .page-contributor {
      padding: 0 20px;

      & > a:nth-child(8n) > span {
        margin: 0 !important;
      }
    }
  }
}

// iPhone 6/7/8 Plus(414) Nexus 5X/6/6P(412)
@media (max-width: 420px) {
  .container-contributors .contributors-inner {
    h2 {
      font-size: 1.6rem;
    }

    .page-contributor {
      & > a > span {
        margin: 0 12px 8px 0 !important;

        & > img, & svg {
          width: 40px !important;
          height: 40px !important;
        }
      }

      & > a:nth-child(8n) > span {
        margin: 0 12px 8px 0 !important;
      }

      & > a:nth-child(7n) > span {
        margin: 0 !important;
      }
    }
  }
}

// iPhone 6/7/8/X(375) Nexus 4/5(384/360)
@media (max-width: 385px) {
  .container-contributors .contributors-inner {
    .page-contributor {
      & > a:nth-child(7n) > span {
        margin: 0 12px 8px 0 !important;
      }

      & > a:nth-child(6n) > span {
        margin: 0 !important;
      }
    }
  }
}

// iPhone 4/5/SE(320)
@media (max-width: 330px) {
  .container-contributors .contributors-inner {
    .page-contributor {
      & > a:nth-child(6n) > span {
        margin: 0 12px 8px 0 !important;
      }

      & > a:nth-child(5n) > span {
        margin: 0 !important;
      }
    }
  }
}
</style>
