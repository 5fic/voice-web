import { Localized } from 'fluent-react/compat';
import * as React from 'react';
import { useState } from 'react';
import { InView } from 'react-intersection-observer';
import URLS from '../../../urls';
import { Button, LinkButton } from '../../ui/ui';
import Dots from './dots';
import datasets from './other-datasets';

import './resources.css';

const NAV_IDS = {
  getStarted: 'get-started',
  other: 'other-datasets',
  feedback: 'feedback',
};

const A = (props: any) => <a {...props} />;

const Dataset = React.memo(
  ({ color, name, nick, size, url, download, license }: any) => {
    const [collapsed, setCollapsed] = useState(true);
    return (
      <div className="other-dataset box">
        <div className="banner" style={{ backgroundColor: color }} />
        <img src={`/img/datasets/${nick}.png`} alt="" />
        <div className="dots-and-content">
          <Dots backgroundColor={'var(--lighter-grey)'} space={20} />
          <div className="content">
            <h2>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {name || (
                  <Localized id={'data-other-' + nick + '-name'}>
                    <span />
                  </Localized>
                )}
              </a>
            </h2>
            <Localized id={'data-other-' + nick + '-description'}>
              <p />
            </Localized>
            {!collapsed && (
              <ul>
                {[
                  [
                    'cv-license',
                    <Localized id={license.name}>
                      <a href={license.url}>{license.name}</a>
                    </Localized>,
                  ],
                  [
                    'size',
                    <span>
                      {size}{' '}
                      <Localized id="size-gigabyte">
                        <span />
                      </Localized>
                    </span>,
                  ],
                ].map(([label, value]) => (
                  <li key={label as any}>
                    <Localized id={label as any}>
                      <div className="label" />
                    </Localized>
                    <div className="value">{value}</div>
                  </li>
                ))}
              </ul>
            )}
            <div className="buttons">
              <Localized
                id={collapsed ? 'languages-show-more' : 'languages-show-less'}>
                <Button
                  onClick={() => setCollapsed(!collapsed)}
                  rounded
                  outline
                />
              </Localized>
              {!collapsed && download && (
                <Localized id="download-language" $language="">
                  <LinkButton
                    rounded
                    outline
                    className="download"
                    href={download}
                  />
                </Localized>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const Section = React.memo(({ name, onChangeSection, ...props }: any) => (
  <InView
    onChange={(isVisible, entry) => {
      if (entry.intersectionRatio > 0.15) {
        onChangeSection(name);
      }
    }}
    threshold={[0.1, 0.2]}>
    <A name={name} />
    <section {...props} />
  </InView>
));

export default React.memo(() => {
  const [activeSection, setActiveSection] = useState(null);
  return (
    <div className="dataset-resources">
      <nav>
        <ul>
          {[
            ['get-started-speech', NAV_IDS.getStarted],
            ['other-datasets', NAV_IDS.other],
            ['feedback-q', NAV_IDS.feedback],
          ].map(([labelId, id]) => (
            <li key={id} className={id == activeSection ? 'active' : ''}>
              <div className="line" />
              <Localized id={labelId} key={labelId}>
                <a href={'#' + id} />
              </Localized>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sections">
        <Section
          name={NAV_IDS.getStarted}
          onChangeSection={setActiveSection}
          className="get-started">
          {[
            [
              'DeepSpeech',
              'deepspeech-info',
              'deepspeech',
              {
                githubLink: (
                  <a
                    href="https://github.com/mozilla/DeepSpeech"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
                discourseLink: (
                  <a
                    href="https://discourse.mozilla.org/c/deep-speech"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
              },
            ],
            [
              'Discourse',
              'common-voice-info',
              'discourse',
              {
                discourseLink: (
                  <a
                    href="https://discourse.mozilla.org/c/voice"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
              },
            ],
          ].map(([title, descriptionId, imgSrc, props]) => (
            <div className="box">
              <img src={`/img/datasets/${imgSrc}.png`} />
              <div className="dots-and-content">
                <Dots backgroundColor={'var(--lighter-grey)'} space={20} />
                <div className="content">
                  <h2>{title}</h2>
                  <Localized id={descriptionId as string} {...props}>
                    <p />
                  </Localized>
                </div>
              </div>
            </div>
          ))}
        </Section>

        <Section
          name={NAV_IDS.other}
          onChangeSection={setActiveSection}
          className="other-datasets">
          {datasets.map(props => (
            <Dataset key={props.nick} {...props} />
          ))}
        </Section>

        <Section name={NAV_IDS.feedback} onChangeSection={setActiveSection}>
          <div className="box feedback">
            <img src="/img/datasets/feedback.png" />
            <div className="dots-and-content">
              <Dots backgroundColor={'var(--lighter-grey)'} space={20} />
              <div className="content">
                <div className="described-button">
                  <Localized id="your-feedback">
                    <p />
                  </Localized>
                  <Localized id="go-discourse">
                    <LinkButton
                      href="https://discourse.mozilla.org/c/voice"
                      blank
                      rounded
                      outline
                    />
                  </Localized>
                </div>
                <div className="described-button">
                  <Localized id="missing-language">
                    <p />
                  </Localized>
                  <Localized id="go-languages-page">
                    <LinkButton to={URLS.LANGUAGES} rounded outline />
                  </Localized>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
});
