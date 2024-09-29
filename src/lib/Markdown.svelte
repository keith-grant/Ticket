<script>
  import { micromark } from 'micromark';

  export let content = '';
</script>

<article class="container">
  {@html micromark(content)}
</article>
