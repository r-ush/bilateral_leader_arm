# Teleoperating Leader Arm for Dual Arm

Research page for bilateral leader–follower teleoperation and force feedback.

**Authors:** Seunghwan Um, Chemin Ahn, Jeong Hwan Park, Sung Jun Lee.

**Advisor:** Hyouk Ryeol Choi (최혁렬).

## Local preview

From this folder:

```powershell
python -m http.server 8766 --bind 127.0.0.1
```

Open http://127.0.0.1:8766/ in a browser. Internet access is needed for MathJax equation rendering; CSS, fonts, posters, and videos are local.

## Page structure

- Main demonstration: bilateral teleoperation with robotic hands, directly below the title. A highlighted note states that the force-feedback gain was increased to make its response more visible.
- KRoC 2026 presentation information with an official program link.
- Overview and illustrated bilateral motion/force flow, depicting the operator, leader interface, and dual-arm follower.
- Expandable dual-arm force-feedback and simulation demonstrations.
- Expandable control principle, closed by default: follower forward kinematics, sensor-to-base wrench transformation, JT reflection, Cartesian virtual impedance, gravity compensation/current output, and optional friction feedforward.

English is the default. EN/KR switches static text and remembers the chosen language. Visible videos play muted and pause outside the viewport, inside closed sections, or when the tab is hidden. A manual pause is respected. Reduced-motion users can play videos through native controls.

The equations were checked against `teleop_cpp` in the Robotory-Dual-arm/teleop repository at commit `7d789be`. The recordings illustrate the system; they do not establish which feedback mode was active or provide quantitative comparisons between feedback modes. The C++ node controls one selected six-joint arm per instance.

## KRoC 2026 presentation

Seunghwan Um presented **리더암 힘피드백이 가능한 양팔 로봇 텔레오퍼레이션 시스템 개발** at the 21st Korea Robotics Society Annual Conference (KRoC 2026), **[TA6] Special Session 5: 물류 센터 작업을 위한 휴머노이드 기술**. The official program lists the session on February 5, 2026, 09:00–10:40, at Daegwallyeong 2 (1F). This is the session time, not an individual talk slot.

[Official Korea Robotics Society program](https://kros.org/Conference/ConferenceView.asp?AC=0&CODE=CC20250902&CpPage=298)

## Media

Original source recordings remain unchanged in the root folder and are ignored by Git. Optimized H.264/AAC MP4 copies, with fast start, are in `static/videos`; matching posters are in `static/images`.

| Web copy | Original recording |
| --- | --- |
| dual-arm-force-feedback.mp4 | Dual Leaderarm teleoperation feedback.mp4 |
| dual-arm-hand-teleoperation.mp4 | Dual Leaderarm teleoperation feedback hand.mp4 |
| leader-follower-simulation.mp4 | 5. Weekly Report_20250908_엄승환_1.mp4 |

## Publication

Project URL: https://r-ush.github.io/bilateral_leader_arm/

Repository: https://github.com/r-ush/bilateral_leader_arm

The `.nojekyll` file supports a static GitHub Pages deployment from `main` / `/ (root)`.

The `Teleoperating leader arm for Dual Arm` entry in the main portfolio links to this page and the website repository, alongside the existing Video link.

## Credits

Layout adapted from [Scooping Grasping with Robotic Hand](https://r-ush.github.io/scooping_robotic_hand/), based on [NeRFies](https://github.com/nerfies/nerfies.github.io).

Bulma CSS is distributed under the MIT license. Pretendard Variable is self-hosted; its license is included in `static/fonts/Pretendard-LICENSE.txt`.
