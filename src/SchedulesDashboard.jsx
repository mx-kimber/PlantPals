import React from 'react';
import { CollectedPlantsNoSchedule} from "./CollectedPlantsNoSchedule"
import { SchedulesIndex } from "./SchedulesIndex"

export function SchedulesDashboard() {
  return (
    <div>
      <hr />
      <h1></h1>
      <SchedulesIndex />
      <CollectedPlantsNoSchedule />
      <hr />
    </div>
  );
}



