<script>
  export let comments = [];

  // Importing the component itself to handle recursive replies
  import CommentSection from './CommentSection.svelte';
</script>

<div class="comments">
  {#each comments as comment}
    <div class="comment">
      <div class="comment-content">
        <strong>{comment.user}</strong> on {new Date(
          comment.timestamp,
        ).toLocaleString()}:
        <p>{comment.content}</p>
      </div>
      {#if comment.replies.length > 0}
        <div class="replies">
          <CommentSection comments={comment.replies} />
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .comments {
    margin-left: 1rem;
  }
  .comment {
    border: 1px solid #ddd;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .replies {
    margin-left: 1rem;
    border-left: 2px solid #eee;
    padding-left: 0.5rem;
  }
</style>
