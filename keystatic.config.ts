import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    site: singleton({
      label: 'Site settings',
      path: 'src/content/site',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Brand name' }),
        tagline: fields.text({ label: 'Tagline', multiline: true }),
        supporting: fields.text({ label: 'Supporting line', multiline: true }),
        location: fields.text({ label: 'Location' }),
        url: fields.url({ label: 'Site URL' }),
        email: fields.text({ label: 'Email' }),
        whatsapp: fields.text({
          label: 'WhatsApp (E.164 without +)',
          description: 'Example: 923001234567 — leave blank to hide WhatsApp',
        }),
        whatsappDisplay: fields.text({ label: 'WhatsApp display' }),
        formspreeEndpoint: fields.text({
          label: 'Formspree endpoint',
          description: 'Optional. Leave blank to use mailto fallback.',
        }),
      },
    }),
  },
  collections: {
    work: collection({
      label: 'Work',
      slugField: 'title',
      path: 'src/content/work/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        format: fields.text({ label: 'Format' }),
        platform: fields.text({ label: 'Platform' }),
        vertical: fields.text({ label: 'Vertical' }),
        poster: fields.text({
          label: 'Poster image path',
          description: 'Cover image for now, e.g. /posters/work-01.jpg',
        }),
        videoSrc: fields.text({
          label: 'Short video path (optional)',
          description: 'When ready, put an mp4 in /public/videos/ and paste e.g. /videos/work-01.mp4 — replaces the poster on hover/autoplay.',
        }),
        driveUrl: fields.url({
          label: 'Drive / reel URL',
          description: 'Paste the Google Drive (or other) link clients open for the full cut.',
        }),
        order: fields.integer({ label: 'Order', defaultValue: 1 }),
      },
    }),
    stats: collection({
      label: 'Impact stats',
      slugField: 'label',
      path: 'src/content/stats/*',
      format: { data: 'yaml' },
      schema: {
        label: fields.slug({ name: { label: 'Label' } }),
        value: fields.integer({ label: 'Number', description: 'Counting target, e.g. 120' }),
        suffix: fields.text({
          label: 'Suffix',
          description: 'Optional — e.g. +, k+, M',
          defaultValue: '+',
        }),
        display: fields.text({
          label: 'Custom display (optional)',
          description: 'If set, shows this text instead of counting — e.g. 1–7',
        }),
        order: fields.integer({ label: 'Order', defaultValue: 1 }),
      },
    }),
    testimonials: collection({
      label: 'Testimonials',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role / company' }),
        quote: fields.text({ label: 'Comment', multiline: true }),
        order: fields.integer({ label: 'Order', defaultValue: 1 }),
      },
    }),
    formats: collection({
      label: 'Formats',
      slugField: 'title',
      path: 'src/content/formats/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        label: fields.text({ label: 'Label' }),
        blurb: fields.text({ label: 'Blurb', multiline: true }),
        order: fields.integer({ label: 'Order', defaultValue: 1 }),
      },
    }),
    process: collection({
      label: 'Process',
      slugField: 'title',
      path: 'src/content/process/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        label: fields.text({ label: 'Label' }),
        body: fields.text({ label: 'Body', multiline: true }),
        order: fields.integer({ label: 'Order', defaultValue: 1 }),
      },
    }),
  },
});
