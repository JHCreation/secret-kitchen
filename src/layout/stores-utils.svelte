<script lang="ts" module>
    import dayjs from "dayjs";

    export function getSaleDate() {
      const now= dayjs().format('HH:mm')
      const overTodayTime= now <= '06:00' && now >= '00:00'
      const saleDate= overTodayTime ? dayjs().subtract(1, 'day') : dayjs()
      // const saleDate= dayjs().subtract(1, 'day')
      return saleDate
    }

    export function stringToBoolean(str) {
      switch(str.toLowerCase().trim()) {
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(str);
      }
    }
</script>