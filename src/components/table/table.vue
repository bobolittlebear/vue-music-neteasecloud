<template>
  <div class="ferry-resource-step-table">
    <table>
      <thead>
        <tr>
          <th class="text-center" style="width: 40px">#</th>
          <th v-show="editMode" style="width: 100px">失败时跳过</th>
          <th class="text-center" style="width: 180px">操作</th>
        </tr>
      </thead>
      <tbody>
        <Container @drop="onDrop">
          <Draggable tag="tr" v-for="(item, index) in items" :key="index">
            <td class="text-center" style="width: 140px">
              <div>{{ item + '' + index }}</div>
            </td>
            <td style="width: 100px">
              <div style="width: 100px">fill</div>
            </td>
            <td style="width: 180px">
              <div style="width: 100px">test</div>
            </td>
          </Draggable>
        </Container>
      </tbody>
    </table>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'

export default {
  name: 'ResourceStepTable',
  components: {
    Container,
    Draggable,
  },
  props: {
    resourceItem: {
      type: Object,
      default: function () {
        return {}
      },
    },
    resourceModelItems: {
      type: Array,
      default: function () {
        return []
      },
    },
    stepTypeItems: {
      type: Array,
      default: function () {
        return []
      },
    },
    resourceIndex: {
      type: Number,
      default: function () {
        return 0
      },
    },
    editMode: {
      type: Boolean,
      default: function () {
        return true
      },
    },
  },
  data() {
    return {
      items: ['1a', 's2', '3w', 'q4'],
    }
  },
  methods: {
    addStep: function (index) {
      this.resourceItem.steps.splice(index + 1, 0, {
        stepTypeId: null,
        stepContinueOnFail: true,
        stepData: ['', ''],
      })
    },
    deleteStep: function (index) {
      if (this.resourceItem.steps.length > 1) {
        this.resourceItem.steps.splice(index, 1)
      } else {
        this.$emit('tips', 'At least contains one action per resource')
      }
    },
    onDrop(dropResult) {
      // this.items = applyDrag(this.items, dropResult);
      console.log(dropResult)
      let tmp = this.items.splice(dropResult.removedIndex, 1)
      console.log(tmp)
      this.items.splice(dropResult.addedIndex, 0, tmp[0])
      console.log(this.items)
    },
  },
}
</script>

<style scoped>
.ferry-resource-step-table {
}
</style>
