<script lang="ts">
  import { tickets } from './data.js';
  import Ticket from './lib/Ticket.svelte';

  let selectedTicket = null;

  function selectTicket(ticket) {
    selectedTicket = ticket;
  }
</script>

<main class="container">
  <h1>Ticketing System</h1>

  <div class="grid">
    <div>
      <h2>Tickets</h2>
      <ul class="list">
        {#each tickets as ticket}
          <li class="ticket-item" on:click={() => selectTicket(ticket)}>
            <article>
              <header>
                <strong>{ticket.fields.title.value}</strong> - Status: {ticket
                  .fields.status.value}
              </header>
            </article>
          </li>
        {/each}
      </ul>
    </div>

    {#if selectedTicket}
      <div class="ticket-details">
        <Ticket ticket={selectedTicket} />
      </div>
    {/if}
  </div>
</main>

<style>
  .ticket-item {
    cursor: pointer;
    padding: 0.5rem;
    border: 1px solid var(--card-border-color);
    margin-bottom: 0.5rem;
    border-radius: var(--radius);
    background: var(--card-background);
    transition: background-color 0.2s;
  }

  .ticket-item:hover {
    background-color: var(--muted-background-hover);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
  }

  .ticket-details {
    padding: 1rem;
    background: var(--card-background);
    border: 1px solid var(--card-border-color);
    border-radius: var(--radius);
  }

  .list {
    padding: 0;
    list-style: none;
  }
</style>
