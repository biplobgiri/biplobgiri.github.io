'use client';

import { useEffect, useState } from 'react';

// Each frame is a fixed 34-column x 9-row ASCII grid (padded with spaces so
// swapping frames never reflows the layout). Frames 0-7 dig a shallow hole
// with a small dirt pile, 8-15 a deeper hole with a bigger pile, and 16-23
// are the steady "fully dug" loop that repeats forever after.
const FRAMES = [
  '                                  \n      O                           \n     /|\\ |                        \n      |  |                        \n      |  |                        \n     / \\ =                        \n----------------------------------\n                                  \n                                  ',
  '                                  \n      O                           \n     /|\\  /                       \n      |  /                        \n      |                           \n     / \\                          \n----------------------------------\n                                  \n                                  ',
  '         /                        \n      O   /                       \n     /|\\ /                        \n      |                           \n      |                           \n     / \\                          \n----------------------------------\n                                  \n                                  ',
  '                                  \n       O                          \n      /| \\                        \n       |  \\                       \n       |    \\                     \n      / \\                         \n----------------------------------\n                                  \n                                  ',
  '                                  \n       O                          \n      /| \\                        \n       |   \\                      \n       |     \\                    \n      / \\     = =                 \n----------------------------------\n                                  \n                                  ',
  '                                  \n      O                           \n     /|\\   \\                      \n      |     \\                     \n      |                           \n     / \\     =:                   \n----------------------------------\n                                  \n                                  ',
  '                                  \n      O                           \n     /|     -       :             \n      |      -                    \n      |                           \n     / \\                          \n----------------------------------\n                                  \n                                  ',
  '                                  \n      O                           \n     /|\\  \\                       \n      |  \\                        \n      |  |                        \n     / \\ =                        \n----------------------------------\n                                  \n                                  ',
  '                                  \n      O                           \n     /|\\ |                        \n      |  |                        \n      |  |                        \n     / \\ =                        \n------------------       --_:::::_\n                  _______         \n                                  ',
  '                                  \n      O                           \n     /|\\  /                       \n      |  /                        \n      |                           \n     / \\                          \n------------------       --_:::::_\n                  _______         \n                                  ',
  '         /                        \n      O   /                       \n     /|\\ /                        \n      |                           \n      |                           \n     / \\                          \n------------------       --_:::::_\n                  _______         \n                                  ',
  '                                  \n       O                          \n      /| \\                        \n       |  \\                       \n       |    \\                     \n      / \\                         \n------------------       --_:::::_\n                  _______         \n                                  ',
  '                                  \n       O                          \n      /| \\                        \n       |   \\                      \n       |     \\                    \n      / \\     = =                 \n------------------       --_:::::_\n                  _______         \n                                  ',
  '                                  \n      O                           \n     /|\\   \\                      \n      |     \\                     \n      |                           \n     / \\     =:                   \n------------------       --_:::::_\n                  _______         \n                                  ',
  '                                  \n      O                           \n     /|     -       :             \n      |      -                    \n      |                           \n     / \\                          \n------------------       --_:::::_\n                  _______         \n                                  ',
  '                                  \n      O                           \n     /|\\  \\                       \n      |  \\                        \n      |  |                        \n     / \\ =                        \n------------------       --_:::::_\n                  _______         \n                                  ',
  '                                  \n      O                           \n     /|\\ |                        \n      |  |                        \n      |  |                   .:.  \n     / \\ =                  .:::. \n------------------       --_:::::_\n                                  \n                  _______         ',
  '                                  \n      O                           \n     /|\\  /                       \n      |  /                        \n      |                      .:.  \n     / \\                    .:::. \n------------------       --_:::::_\n                                  \n                  _______         ',
  '         /                        \n      O   /                       \n     /|\\ /                        \n      |                           \n      |                      .:.  \n     / \\                    .:::. \n------------------       --_:::::_\n                                  \n                  _______         ',
  '                                  \n       O                          \n      /| \\                        \n       |  \\                       \n       |    \\                .:.  \n      / \\                   .:::. \n------------------       --_:::::_\n                                  \n                  _______         ',
  '                                  \n       O                          \n      /| \\                        \n       |   \\                      \n       |     \\               .:.  \n      / \\     = =           .:::. \n------------------       --_:::::_\n                                  \n                  _______         ',
  '                                  \n      O                           \n     /|\\   \\                      \n      |     \\                     \n      |                      .:.  \n     / \\     =:             .:::. \n------------------       --_:::::_\n                                  \n                  _______         ',
  '                                  \n      O                           \n     /|     -       :             \n      |      -                    \n      |                      .:.  \n     / \\                    .:::. \n------------------       --_:::::_\n                                  \n                  _______         ',
  '                                  \n      O                           \n     /|\\  \\                       \n      |  \\                        \n      |  |                   .:.  \n     / \\ =                  .:::. \n------------------       --_:::::_\n                                  \n                  _______         ',
];

// Index at which the steady-state loop begins (deep hole, full pile) — once
// the animation reaches the end of the array it wraps back to here forever,
// rather than re-running the shallow-hole cycles.
const STEADY_LOOP_START = 16;
const FRAME_INTERVAL_MS = 180;

export default function HomePage() {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrameIndex((prev) => {
        const next = prev + 1;
        return next >= FRAMES.length ? STEADY_LOOP_START : next;
      });
    }, FRAME_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <main
      style={{ backgroundColor: '#000' }}
      className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-16"
    >
      <pre
        style={{
          fontFamily: '"Courier New", Courier, monospace',
          color: '#33ff33',
          textShadow: '0 0 6px rgba(51, 255, 51, 0.5)',
        }}
        className="whitespace-pre text-sm leading-tight sm:text-base"
      >
        {FRAMES[frameIndex]}
      </pre>

      <p
        style={{
          fontFamily: '"Courier New", Courier, monospace',
          color: '#33ff33',
        }}
        className="text-sm tracking-wide sm:text-base"
      >
        digging<span className="animate-pulse">...</span>
        <span className="ml-1 inline-block w-2 animate-pulse">▊</span>
      </p>
    </main>
  );
}
