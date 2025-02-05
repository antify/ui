<script setup lang="ts">
import {AntTableRowTypes, AntTableSize, type TableHeader} from "./__types";
import AntTd from "./AntTd.vue";
import AntTh from "./AntTh.vue";
import AntSkeleton from "../AntSkeleton.vue";

withDefaults(
  defineProps<{
    headers: TableHeader[];
    getRowClasses: (element: Record<string, unknown>, rowIndex: number) => {},
    size?: AntTableSize;
    headerColor?: string;
    showLightVersion?: boolean;
  }>(), {
    size: AntTableSize.md,
    headerColor: 'bg-base-200',
    showLightVersion: false,
  });
</script>

<template>
  <div class="overflow-hidden h-full overflow-x-auto overflow-y-auto">
    <table
      class="min-w-full max-h-full relative"
    >
      <thead class="sticky top-0 z-10" :class="headerColor">
      <tr>
        <AntTh
          v-if="!showLightVersion || (showLightVersion && headers[0].lightVersion)"
          v-for="colNum in [0,1,2]"
          :key="`table-header-col-0`"
          :header="{
              identifier: `th-${colNum}`,
              type: AntTableRowTypes.slot
            }"
          :size="size"
        >
          <template #headerContent>
               <span class="relative h-4 w-full max-w-24 rounded overflow-hidden">
              <AntSkeleton
                absolute/>
            </span>
          </template>
        </AntTh>
      </tr>
      </thead>

      <tbody class="bg-white relative">
      <tr
        data-e2e="table-row"
        :class="getRowClasses({'foo': 'bar'}, 0)"
      >
        <AntTd
          v-if="!showLightVersion || (showLightVersion && headers[0].lightVersion)"
          v-for="colNum in [0,1,2]"
          :header="{
              identifier: `th-${colNum}`,
              type: AntTableRowTypes.slot
            }"
          :element="{'foo': 'bar'}"
          :size="size"
        >
          <template #cellContent>
              <span class="flex relative h-4 w-full max-w-36 rounded overflow-hidden">
                <AntSkeleton
                  absolute/>
              </span>
          </template>
        </AntTd>
      </tr>
      <tr
        data-e2e="table-row"
        :class="getRowClasses({'foo': 'bar'}, 1)"
      >
        <AntTd
          v-if="!showLightVersion || (showLightVersion && headers[0].lightVersion)"
          v-for="colNum in [0,1,2]"
          :header="{
              identifier: `th-${colNum}`,
              type: AntTableRowTypes.slot
            }"
          :element="{'foo': 'bar'}"
          :size="size"
        >
          <template #cellContent>
              <span class="flex relative h-4 w-full max-w-48 rounded overflow-hidden">
                <AntSkeleton
                  absolute/>
              </span>
          </template>
        </AntTd>
      </tr>
      <tr
        data-e2e="table-row"
        :class="getRowClasses({'foo': 'bar'}, 2)"
      >
        <AntTd
          v-if="!showLightVersion || (showLightVersion && headers[0].lightVersion)"
          v-for="colNum in [0,1,2]"
          :header="{
              identifier: `th-${colNum}`,
              type: AntTableRowTypes.slot
            }"
          :element="{'foo': 'bar'}"
          :size="size"
        >
          <template #cellContent>
              <span class="flex relative h-4 w-full max-w-28 rounded overflow-hidden">
                <AntSkeleton
                  absolute/>
              </span>
          </template>
        </AntTd>
      </tr>
      </tbody>
    </table>
  </div>
</template>
