import { FC, useEffect, useState } from "react";

interface RegistrationChartProps {}

import dynamic from "next/dynamic";
import { useMediaQuery } from "@/shared/tools";
import * as PeriodModel from "@/widgets/dashboard/model";
import * as ContactModel from "@/widgets/welcomePageSignup/model";
import { useUnit } from "effector-react";
import { useAccount } from "wagmi";
import * as api from "@/shared/api/";
import * as TimeTypeM from "./model";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const RegistrationChart: FC<RegistrationChartProps> = () => {
  const isMobile = useMediaQuery("(max-width: 650px)");
  const categories = [
    "00:00",
    "03:00",
    "06:00",
    "09:00",
    "12:00",
    "15:00",
    "18:00",
    "21:00",
    "00:00",
    "03:00",
  ];

  const [periodSecond, signature, timestamp, timeType] = useUnit([
    PeriodModel.$periodSecond,
    ContactModel.$signature,
    ContactModel.$timestamp,
    TimeTypeM.$periodType,
  ]);

  const { address } = useAccount();

  const [registrationsBody, setRegistrationsBody] = useState<any>();
  const [depositedAccount, setDepositedAccounts] = useState<any>();

  useEffect(() => {
    (async () => {
      if (periodSecond && address && signature) {
        const response = await api.getUsersRegistrationChart({
          auth: signature,
          timestamp,
          wallet: address?.toLowerCase(),
          endTime: periodSecond.timeline,
        });
        if (response.status === "OK") {
          setRegistrationsBody(response.body);
        }
        console.log("second chart response", response);

        const response2 = await api.getDepositedUsers({
          auth: signature,
          timestamp,
          wallet: address?.toLowerCase(),
          period: timeType,
        });
        if (response2.status === "OK") {
          setDepositedAccounts(response2.body);
        }
        console.log("deposited back response", response);
      }
    })();
  }, [periodSecond, signature, timeType]);

  const options = {
    chart: {
      id: "line-chart",

      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: [0, 1, 2],
        top: 0,
        left: 0,
        blur: 3,
        color: ["#F2DE2F", "#2FF24E", "#CD4C30"],
        opacity: 0.4,
      },
    },

    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.2,
        opacityTo: 0,
      },
    },
    xaxis: {
      categories: categories,
      type: "category",
      position: "bottom",
      tickPlacement: "between",

      labels: {
        show: true,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        style: {
          colors: "#7E7E7E",
          fontSize: isMobile ? "8px" : "12px",
          fontWeight: 400,
        },
        offsetX: 0,
        offsetY: 0,
        datetimeUTC: true,
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm",
        },
      },

      axisBorder: {
        show: true,
        color: "#282828",
        height: 1,
        width: "100%",
        offsetX: 0,
        offsetY: 10,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "#282828",
        height: 6,
        offsetX: 0,
        offsetY: 0,
      },

      title: {
        text: undefined,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: "22px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 600,
          cssClass: "apexcharts-xaxis-title",
        },
      },
    },
    yaxis: {
      min: 0,
      show: true,
      labels: {
        show: true,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        style: {
          colors: "#7E7E7E",
          fontSize: isMobile ? "8px" : "12px",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
        offsetX: 0,
        offsetY: 0,
        datetimeUTC: true,
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm",
        },
      },
      axisBorder: {
        show: true,
        color: "#282828",
        offsetX: 0,
        offsetY: 0,
      },
      tooltip: {
        enabled: true,
        offsetX: 0,
      },
    },

    colors: ["#F2DE2F", "#2FF24E", "#CD4C30"],
    stroke: {
      curve: "smooth",
      width: isMobile ? 1 : 1.5,
    },
    subtitle: {
      text: "Статистика регистраций",
      align: "left",
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "16px",
        fontWeight: "normal",
        color: "#EAEAEA",
      },
    },
    grid: {
      show: true,
      borderColor: "#282828",
      strokeDashArray: 10,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      row: {
        colors: "",
      },
      column: {
        colors: "",
      },
      padding: {
        top: 20,
        right: 0,
        bottom: 20,
        left: 20,
      },
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
      fontSize: isMobile ? "8px" : "12px",
      fontWeight: 400,
      inverseOrder: false,
      labels: {
        colors: "#979797",
        useSeriesColors: false,
      },
      markers: {
        width: isMobile ? 8 : 10,
        height: isMobile ? 8 : 10,
        onClick: undefined,
        offsetX: isMobile ? -4 : -10,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: isMobile ? 10 : 27,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      intersect: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: "dark",
    },
  };

  const series = [
    {
      name: "Регистрация",
      data: [registrationsBody?.connected_wallets || 1],
    },
    {
      name: "Новые аккаунты с депозитами",
      data: [depositedAccount?.connected_wallets || 2],
    },
    {
      name: "Сумма коммиссий",
      data: [
        0.7, 3.3, 3.2, 3.5, 3.7, 3.7, 3.4, 3.5, 3.6, 3.1, 3.2, 3.5, 3.6, 3.7,
        3.2,
      ],
    },
  ];
  return (
    <ReactApexChart
      // @ts-ignore
      options={options}
      series={series}
      type="area"
      height={350}
    />
  );
};
