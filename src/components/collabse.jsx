import React from 'react'

export default function Collabse() {
  return (
    <div>hu
   <a
  className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
  data-te-collapse-init
  data-te-ripple-init
  data-te-ripple-color="light"
  href="#collapseWithScrollbar"
  role="button"
  aria-expanded="false"
  aria-controls="collapseWithScrollbar">
  Longer content
</a>
<div
  className="!visible mt-4 hidden max-h-24 overflow-y-auto"
  data-te-collapse-item
  id="collapseWithScrollbar"
  styles="max-width: 500px">
  <p>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
    terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
    labore wes anderson cred nesciunt sapiente ea proident. Ad vegan
    excepteur butcher vice lomo. Leggings occaecat craft beer
    farm-to-table, raw denim aesthetic synth nesciunt you probably haven't
    heard of them accusamus labore sustainable VHS. 3 wolf moon officia
    aute, non cupidatat skateboard dolor brunch. Food truck quinoa
    nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a
    bird on it squid single-origin coffee nulla assumenda shoreditch et.
  </p>
</div>
</div>
  )
}
