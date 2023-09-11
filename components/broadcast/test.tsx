"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const clientA = createClient(
  'https://naiscprlenbohhfjhyhi.supabase.co',
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5haXNjcHJsZW5ib2hoZmpoeWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0ODc1MTMsImV4cCI6MjAwNzA2MzUxM30.fdTr5Iu8OaCTcn5Fb0IVdoh0P2YZ_VcgcYefVnG8EXI"
);

const TestBroadcast = () => {
  const [eventData, setEventData] = useState([]);
  useEffect(() => {
    // Create a channel for schema changes
    const channelA = clientA
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public' }, (payload:any) =>
        // Update the eventData state with the new payload
          setEventData(payload)
      )
      .subscribe();

    // Create a channel for table insert events
    const channelB = clientA
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Drop' },
        (payload) => console.log('ChannelB:', payload)
      )
      .subscribe();

    // Clean up subscriptions when the component unmounts
    return () => {
      channelA.unsubscribe();
      channelB.unsubscribe();
    };
  }, []); // Empty dependency array to run this effect only once

  return (
    <div>
      <h1>Real-Time Broadcast Events</h1>
      <p>Check the console for real-time event logs.</p>
    </div>
  );
};

export default TestBroadcast;
