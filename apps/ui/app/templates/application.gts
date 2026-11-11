import { pageTitle } from 'ember-page-title';
import EmInput from 'ember-ui/components/em-input.gts';
import { t } from 'ember-intl';

<template>
  {{pageTitle "EmberQuickstart"}}

  <h1 class="text-3xl font-bold underline">
    EmberQuickstart
  </h1>

  {{outlet}}

  <EmInput @id="home-input">{{t "hello.message" name="Zoey"}}</EmInput>
</template>
