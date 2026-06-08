import React, { useMemo, useState } from "react";
import { CalendarDays, LockKeyhole, MapPin, ShieldCheck } from "lucide-react";
import { MiniBadge, SectionShell } from "./common";

const records = [
  { title: "中国区离职结算规则", region: "中国区", year: 2026, acl: "manager", score: 0.94 },
  { title: "中国区未休年假折算", region: "中国区", year: 2026, acl: "all", score: 0.89 },
  { title: "海外员工假期说明", region: "海外", year: 2026, acl: "all", score: 0.86 },
  { title: "中国区 2024 旧版手册", region: "中国区", year: 2024, acl: "all", score: 0.82 },
  { title: "HR 内部争议处理清单", region: "中国区", year: 2026, acl: "hr", score: 0.79 },
];

const SectionFilterRules: React.FC = () => {
  const [regionOnly, setRegionOnly] = useState(true);
  const [latestOnly, setLatestOnly] = useState(true);
  const [managerView, setManagerView] = useState(false);

  const visible = useMemo(
    () =>
      records.filter((record) => {
        if (regionOnly && record.region !== "中国区") return false;
        if (latestOnly && record.year !== 2026) return false;
        if (!managerView && record.acl === "manager") return false;
        if (record.acl === "hr") return false;
        return true;
      }),
    [regionOnly, latestOnly, managerView],
  );

  const switches = [
    {
      id: "region",
      label: "只看中国区",
      checked: regionOnly,
      set: setRegionOnly,
      icon: MapPin,
    },
    {
      id: "latest",
      label: "只看 2026 版",
      checked: latestOnly,
      set: setLatestOnly,
      icon: CalendarDays,
    },
    {
      id: "manager",
      label: "我是经理",
      checked: managerView,
      set: setManagerView,
      icon: LockKeyhole,
    },
  ];

  return (
    <SectionShell num="04" label="metadata filter" tone="white">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div>
          <div className="mb-4 inline-flex rounded-full border-2 border-ink bg-butter p-2 shadow-stamp">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="font-display text-display-lg">相似内容也要先过条件</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">
            向量相似只回答“意思像不像”。公司资料还要看地区、版本、权限。metadata 就是这些硬条件。
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-ink/70">
            真实系统里，这一步很要命。搜到了“很像”的资料，如果用户没权限看，数据库就不能把它交出去。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
          <div className="card-stamp bg-cream p-5">
            <MiniBadge>filter</MiniBadge>
            <div className="mt-5 space-y-3">
              {switches.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => item.set(!item.checked)}
                    className={`flex w-full items-center justify-between rounded-2xl border-2 border-ink p-4 text-left transition-all duration-250 ease-spring ${
                      item.checked ? "bg-ink text-cream shadow-stamp" : "bg-white text-ink"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-bold">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    <span className="font-mono text-xs font-bold">{item.checked ? "ON" : "OFF"}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-2 border-ink bg-butter-tint p-5 shadow-stamp-lg">
            <div className="flex items-center justify-between">
              <MiniBadge>result</MiniBadge>
              <span className="font-mono text-xs font-bold text-ink/55">{visible.length} 条可返回</span>
            </div>
            <div className="mt-5 space-y-3">
              {records.map((record) => {
                const shown = visible.includes(record);
                return (
                  <div
                    key={record.title}
                    className={`rounded-2xl border-2 border-ink p-4 ${
                      shown ? "bg-white" : "bg-cream text-ink/45"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-bold">{record.title}</p>
                      <span className="font-mono text-xs font-bold">{record.score.toFixed(2)}</span>
                    </div>
                    <p className="mt-2 text-sm">
                      {record.region} · {record.year} · 权限 {record.acl}
                    </p>
                    {!shown && (
                      <p className="mt-2 text-xs font-semibold text-coral">
                        相似度够高，但条件没过，所以不返回。
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default SectionFilterRules;
