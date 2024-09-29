<script>
  export let showDialog = false;
  export let onClose;
  export let onAddField;

  let fieldName = '';
  let fieldType = 'string';
  let fieldValue = '';

  function handleAdd() {
    if (fieldName.trim() !== '') {
      onAddField({ name: fieldName, type: fieldType, value: fieldValue });
      resetForm();
      onClose();
    }
  }

  function resetForm() {
    fieldName = '';
    fieldType = 'string';
    fieldValue = '';
  }

  function handleCancel() {
    resetForm();
    onClose();
  }
</script>

{#if showDialog}
  <dialog open>
    <article>
      <header>
        <h3>Add Field</h3>
        <a
          href="#"
          aria-label="Close"
          class="close"
          on:click|preventDefault={handleCancel}
        ></a>
      </header>

      <form on:submit|preventDefault={handleAdd}>
        <label for="fieldName">Field Name</label>
        <input type="text" id="fieldName" bind:value={fieldName} required />

        <label for="fieldType">Field Type</label>
        <select id="fieldType" bind:value={fieldType}>
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="markdown">Markdown</option>
        </select>

        <label for="fieldValue">Field Value</label>
        {#if fieldType === 'string'}
          <input type="text" id="fieldValue" bind:value={fieldValue} required />
        {:else if fieldType === 'number'}
          <input
            type="number"
            id="fieldValue"
            bind:value={fieldValue}
            required
          />
        {:else if fieldType === 'date'}
          <input type="date" id="fieldValue" bind:value={fieldValue} required />
        {:else if fieldType === 'markdown'}
          <textarea
            id="fieldValue"
            bind:value={fieldValue}
            rows="4"
            required
            placeholder="Enter markdown content here..."
          ></textarea>
        {/if}

        <footer>
          <button type="submit" role="primary">Add</button>
          <button type="button" class="secondary" on:click={handleCancel}
            >Cancel</button
          >
        </footer>
      </form>
    </article>
  </dialog>
{/if}
