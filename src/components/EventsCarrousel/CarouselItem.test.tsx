import React from 'react';
import { render } from '@testing-library/react-native';
import { CarouselItem } from './CarouselItem';

describe('tests => CarouselItem', () => {
  let component: any;

  const mockOnSelect = jest.fn();

  const item = {
    id: 123456,
    api_model: 'events',
    api_link: 'https://api.artic.edu/api/v1/events/5606',
    title: 'Slow Looking:  Representing the Body in Color (February 4)',
    title_display: 'Slow Looking: Representing the Body in Color CANCELED',
    image_url:
      'https://artic-web.imgix.net/3d41adc6-4124-4785-9841-700672f73873/IM034442-int-Print300ppi%2C3000px%2CAdobeRGB1998%2CTIF1.jpg?rect=0%2C1019%2C2408%2C1353&auto=format%2Ccompress&q=80&fit=crop&crop=faces%2Cedges%2Centropy&w=1200&h=674',
    hero_caption:
      '<p>Ellen Gallagher. <em>Untitled</em>, 1999. Major Acquisitions Fund.</p>',
    short_description:
      '<p>Join the conversation as we consider art and its power to impact a concept as complicated and challenging as race.</p>',
    header_description: null,
    list_description:
      '<p>Join the conversation as we consider art and its power to impact a concept as complicated and challenging as race.</p>',
    description:
      '<p><strong>This program has been canceled. It will be repeated on Saturday, February 18 at 3:00. </strong></p><p>Join the conversation as we consider art and its power to impact a concept as complicated and challenging as race.&nbsp;<br></p><p>This gallery discussion uses artworks that range from ancient Rome to the global 21st century to explore the historical and cultural impact visual representations of the body have on social constructions of race. Participants are invited to learn and discuss with one another as we attempt to understand together the ways art can transform history and shape our future.</p><p>If you have any questions about programming, please reach out to&nbsp;<a href="mailto:museum-programs@artic.edu" rel="noopener noreferrer">museum-programs@artic.edu</a>. For questions related to accessibility accommodations, please email&nbsp;<a href="mailto:access@artic.edu" rel="noopener noreferrer">access@artic.edu</a>.&nbsp;</p><p>Please note that in-person tours may be canceled or postponed due to unforeseen circumstances.</p>',
    location: 'Griffin Court',
    event_type_id: null,
    alt_event_type_ids: [],
    audience_id: 3,
    alt_audience_ids: [],
    program_ids: [78, 65],
    program_titles: ['Public Programs', 'Slow Looking'],
    is_ticketed: false,
    ticketed_event_id: null,
    rsvp_link: null,
    buy_button_text: 'Buy Tickets',
    buy_button_caption:
      '<p><strong>Free with museum admission</strong><br>Program begins promptly at 3:00.</p>',
    is_registration_required: false,
    is_member_exclusive: false,
    is_sold_out: false,
    is_free: true,
    is_private: false,
    is_admission_required: false,
    is_after_hours: false,
    is_virtual_event: false,
    virtual_event_url: null,
    virtual_event_passcode: null,
    start_date: '2023-02-04T00:00:00-06:00',
    end_date: '2023-02-04T00:00:00-06:00',
    start_time: '15:00',
    end_time: '16:00',
    date_display: 'Feb 4 | 3:00–4:00',
    door_time: null,
    layout_type: 0,
    slug: 'slow-looking-representing-the-body-in-color-february-4',
    entrance: null,
    join_url: null,
    survey_url: null,
    event_host_id: null,
    event_host_title: null,
    search_tags: null,
    source_updated_at: '2023-02-04T09:51:40-06:00',
    updated_at: '2023-02-04T09:55:04-06:00',
    timestamp: '2023-02-04T10:36:45-06:00',
  };
  beforeEach(() => {
    component = render(<CarouselItem item={item} onSelect={mockOnSelect} />);
  });

  it('should render CarouselItem', () => {
    component.getByText(
      'Slow Looking:  Representing the Body in Color (February 4)',
    );
  });

  it('should call onSelect when press', () => {
    component.getByTestId('carouselItem').props.onClick();
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it('should render image', () => {
    const image = component.getByTestId('itemImage');
    expect(image.props.source.uri).toBe(item.image_url);
  });

  it('should match snapshot', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
