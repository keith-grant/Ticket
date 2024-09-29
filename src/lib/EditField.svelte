<script>
  export let showDialog = false;
  export let onClose;
  export let onSave;
  export let fieldName = '';
  export let fieldType = 'string';
  export let fieldValue = '';

  let tempFieldName = fieldName;
  let tempFieldType = fieldType;
  let tempFieldValue = fieldValue;

  function handleSave() {
    onSave({ name: tempFieldName, type: tempFieldType, value: tempFieldValue });
    resetForm();
    onClose();
  }

  function resetForm() {
    tempFieldName = fieldName;
    tempFieldType = fieldType;
    tempFieldValue = fieldValue;
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
        <h3>Edit Field</h3>
        <a
          href="#"
          aria-label="Close"
          class="close"
          on:click|preventDefault={handleCancel}
        ></a>
      </header>

      <form on:submit|preventDefault={handleSave}>
        <label for="fieldName">Field Name</label>
        <input type="text" id="fieldName" bind:value={tempFieldName} required />

        <label for="fieldType">Field Type</label>
        <select id="fieldType" bind:value={tempFieldType}>
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="markdown">Markdown</option>
        </select>

        <label for="fieldValue">Field Value</label>
        {#if tempFieldType === 'string'}
          <input
            type="text"
            id="fieldValue"
            bind:value={tempFieldValue}
            required
          />
        {:else if tempFieldType === 'number'}
          <input
            type="number"
            id="fieldValue"
            bind:value={tempFieldValue}
            required
          />
        {:else if tempFieldType === 'date'}
          <input
            type="date"
            id="fieldValue"
            bind:value={tempFieldValue}
            required
          />
        {:else if tempFieldType === 'markdown'}
          <textarea
            id="fieldValue"
            bind:value={tempFieldValue}
            rows="4"
            required
            placeholder="Enter markdown content here..."
          ></textarea>
        {/if}

        <footer>
          <button type="submit" role="primary">Save</button>
          <button type="button" class="secondary" on:click={handleCancel}
            >Cancel</button
          >
        </footer>
      </form>
    </article>
  </dialog>
{/if}
