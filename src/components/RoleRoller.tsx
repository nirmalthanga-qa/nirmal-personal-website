import { site } from '../data/site';

/** Rolls through the titles one at a time. The first title is repeated at the end so the CSS loop wraps seamlessly. */
export function RoleRoller() {
  const loop = [...site.roles, site.roles[0]];
  const label = site.roles.map((r) => r.lead + r.rest).join(', ');

  return (
    <div className="role-wrap">
      <div className="role">
        <span className="sr">{label}</span>
        <ul aria-hidden="true">
          {loop.map((r, i) => (
            <li key={i}>
              <span className="w">{r.lead}</span>
              {r.rest}
            </li>
          ))}
        </ul>
      </div>
      <div className="pips" aria-hidden="true">
        {site.roles.map((r) => (
          <span key={r.lead} />
        ))}
      </div>
    </div>
  );
}
